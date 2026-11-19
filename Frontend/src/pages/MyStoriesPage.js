import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiTag,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { formatArticleDate, getImageUrl } from "../utils/articleUtils";
import PageHero from "../components/UI/PageHero";
import LoadingState from "../components/UI/LoadingState";
import EmptyState from "../components/UI/EmptyState";
import ErrorState from "../components/UI/ErrorState";
import Button from "../components/UI/Button";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";
import "../Css/BloggerEditor.css";

const MyStoriesPage = () => {
  const { config, activeUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const searchKey = params.get("search") || "";
  const statusParam = params.get("status") || "all"; // all | published | draft
  const labelParam = params.get("label") || "All";
  const pageParam = parseInt(params.get("page"), 10) || 1;

  const [searchInput, setSearchInput] = useState(searchKey);
  const [stories, setStories] = useState([]);
  const [userLabels, setUserLabels] = useState([]);
  const [counts, setCounts] = useState({ all: 0, published: 0, drafts: 0 });
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingSlug, setActionLoadingSlug] = useState(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState(null);

  useEffect(() => {
    setSearchInput(searchKey);
  }, [searchKey]);

  const fetchMyStories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams();
      if (searchKey) qs.set("search", searchKey);
      if (statusParam && statusParam !== "all") qs.set("status", statusParam);
      if (labelParam && labelParam !== "All") qs.set("label", labelParam);
      qs.set("page", String(pageParam));
      qs.set("limit", "12");

      const { data } = await axios.get(`/story/myStories?${qs.toString()}`, {
        headers: {
          authorization:
            config?.headers?.authorization ||
            `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setStories(data.data || []);
      setPages(data.pages || 1);
      setUserLabels(data.userLabels || []);
      if (data.counts) {
        setCounts(data.counts);
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate("/login");
        return;
      }
      setError("Could not load your posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchKey, statusParam, labelParam, pageParam, config, navigate]);

  useEffect(() => {
    fetchMyStories();
  }, [fetchMyStories]);

  const updateQuery = (nextSearch, nextStatus, nextLabel, nextPage) => {
    const qs = new URLSearchParams();
    if (nextSearch) qs.set("search", nextSearch);
    if (nextStatus && nextStatus !== "all") qs.set("status", nextStatus);
    if (nextLabel && nextLabel !== "All") qs.set("label", nextLabel);
    if (nextPage > 1) qs.set("page", String(nextPage));
    const queryStr = qs.toString();
    navigate(`/my-blogs${queryStr ? `?${queryStr}` : ""}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery(searchInput.trim(), statusParam, labelParam, 1);
  };

  // Toggle Status: Revert to Draft <-> Publish
  const handleToggleStatus = async (story) => {
    const targetStatus = story.status === "draft" ? "published" : "draft";
    setActionLoadingSlug(story.slug);
    try {
      await axios.put(
        `/story/${story.slug}/status`,
        { status: targetStatus },
        {
          headers: {
            authorization:
              config?.headers?.authorization ||
              `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Refresh list
      await fetchMyStories();
    } catch (err) {
      alert("Failed to update post status. Please try again.");
    } finally {
      setActionLoadingSlug(null);
    }
  };

  const handleDeleteStory = async (slug) => {
    setActionLoadingSlug(slug);
    try {
      await axios.delete(`/story/${slug}/delete`, {
        headers: {
          authorization:
            config?.headers?.authorization ||
            `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setStories((prev) => prev.filter((item) => item.slug !== slug));
      setDeleteConfirmSlug(null);
      fetchMyStories();
    } catch (err) {
      alert("Failed to delete the post. Please try again.");
    } finally {
      setActionLoadingSlug(null);
    }
  };

  return (
    <main>
      <SEOHead
        title="Creator Dashboard | Blogger Studio"
        description="Manage your articles, drafts, labels, and reader engagement."
        canonicalPath="/my-blogs"
      />

      <PageHero
        eyebrow="Creator Studio"
        eyebrowTone="teal"
        title="Creator Dashboard"
        description={`Manage published articles, edit drafts, organize labels, and review performance for ${activeUser?.username || "Author"}.`}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "Dashboard" },
        ]}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button to="/addstory" variant="primary">
            <FiPlus size={16} aria-hidden="true" />
            <span>New Post</span>
          </Button>
          <Button to="/blog" variant="ghost">
            <FiEye size={16} aria-hidden="true" />
            <span>View Public Blog</span>
          </Button>
        </div>
      </PageHero>

      <section className="to-section" style={{ paddingTop: 30 }}>
        <div className="to-container">
          {/* Dashboard Controls Header: Tabs + Label Filter + Search */}
          <div className="to-dashboard-header">
            {/* Filter Tabs: All, Published, Drafts */}
            <div className="to-dashboard-tabs" role="tablist" aria-label="Post Status Tabs">
              <button
                type="button"
                role="tab"
                aria-selected={statusParam === "all"}
                className={`to-dashboard-tab ${statusParam === "all" ? "to-dashboard-tab--active" : ""}`}
                onClick={() => updateQuery(searchKey, "all", labelParam, 1)}
              >
                <span>All</span>
                <span className="to-dashboard-badge">{counts.all}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={statusParam === "published"}
                className={`to-dashboard-tab ${statusParam === "published" ? "to-dashboard-tab--active" : ""}`}
                onClick={() => updateQuery(searchKey, "published", labelParam, 1)}
              >
                <span>Published</span>
                <span className="to-dashboard-badge">{counts.published}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={statusParam === "draft"}
                className={`to-dashboard-tab ${statusParam === "draft" ? "to-dashboard-tab--active" : ""}`}
                onClick={() => updateQuery(searchKey, "draft", labelParam, 1)}
              >
                <span>Drafts</span>
                <span className="to-dashboard-badge">{counts.drafts}</span>
              </button>
            </div>

            {/* Label Filter Dropdown & Search Bar */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {userLabels.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FiTag size={15} color="var(--text-secondary)" />
                  <select
                    className="to-toolbar-select"
                    style={{ minWidth: 140 }}
                    value={labelParam}
                    onChange={(e) => updateQuery(searchKey, statusParam, e.target.value, 1)}
                    aria-label="Filter by Label"
                  >
                    <option value="All">All Labels</option>
                    {userLabels.map((lbl) => (
                      <option key={lbl} value={lbl}>
                        {lbl}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <form className="to-search-bar" onSubmit={handleSearchSubmit} style={{ maxWidth: 280 }}>
                <FiSearch size={16} color="#7C859E" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search posts..."
                  aria-label="Search my posts"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>
          </div>

          {/* Posts Table / List */}
          {loading ? (
            <LoadingState message="Loading your posts..." />
          ) : error ? (
            <ErrorState description={error} onRetry={fetchMyStories} />
          ) : stories.length === 0 ? (
            <EmptyState
              title={
                statusParam === "draft"
                  ? "No drafts in your studio"
                  : statusParam === "published"
                  ? "No published articles yet"
                  : searchKey || labelParam !== "All"
                  ? "No matching posts found"
                  : "You haven't written any posts yet"
              }
              description={
                statusParam === "draft"
                  ? "Drafts you save while writing will be safely stored here."
                  : "Publish technical articles, tutorials, or engineering perspectives to share with the community."
              }
              actionLabel="Create New Post"
              onAction={() => navigate("/addstory")}
            />
          ) : (
            <div className="to-dashboard-table-wrap">
              <table className="to-dashboard-table" aria-label="Creator Posts Table">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>Cover</th>
                    <th>Post Title &amp; Metadata</th>
                    <th>Status</th>
                    <th>Labels</th>
                    <th>Views</th>
                    <th>Date</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story) => {
                    const isDraft = story.status === "draft";
                    const isActing = actionLoadingSlug === story.slug;
                    const isConfirmingDelete = deleteConfirmSlug === story.slug;
                    const formattedDate = formatArticleDate(
                      story.publishedAt || story.createdAt
                    );

                    return (
                      <tr key={story._id || story.slug}>
                        {/* Thumbnail */}
                        <td>
                          <div
                            style={{
                              width: 52,
                              height: 40,
                              borderRadius: 6,
                              overflow: "hidden",
                              background: "var(--bg-secondary)",
                            }}
                          >
                            <img
                              src={getImageUrl(story.image)}
                              alt={story.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                          </div>
                        </td>

                        {/* Title & Preview */}
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <Link
                              to={isDraft ? `/story/${story.slug}/edit` : `/blog/${story.slug}`}
                              style={{
                                color: "var(--text-primary)",
                                fontWeight: 600,
                                fontSize: "0.96rem",
                                textDecoration: "none",
                              }}
                            >
                              {story.title}
                            </Link>
                            <span
                              style={{
                                fontSize: "0.78rem",
                                color: "var(--text-secondary)",
                                maxWidth: 440,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {story.searchDescription || story.excerpt || "No search description added"}
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td>
                          {isDraft ? (
                            <span className="to-status-pill to-status-pill--draft">Draft</span>
                          ) : (
                            <span className="to-status-pill to-status-pill--published">Published</span>
                          )}
                        </td>

                        {/* Labels */}
                        <td>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, maxWidth: 220 }}>
                            {(story.labels || []).length > 0 ? (
                              story.labels.map((lbl) => (
                                <span
                                  key={lbl}
                                  className="to-sidebar-chip"
                                  style={{ fontSize: "0.72rem", padding: "1px 7px" }}
                                >
                                  {lbl}
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                                —
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Views Count */}
                        <td>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              fontSize: "0.88rem",
                              color: "var(--text-primary)",
                            }}
                          >
                            <FiEye size={14} color="var(--accent-primary)" />
                            <span>{story.views || 0}</span>
                          </div>
                        </td>

                        {/* Date */}
                        <td style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                          {formattedDate}
                        </td>

                        {/* Quick Actions */}
                        <td style={{ textAlign: "right" }}>
                          {isConfirmingDelete ? (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <button
                                type="button"
                                onClick={() => handleDeleteStory(story.slug)}
                                disabled={isActing}
                                style={{
                                  background: "#EF4444",
                                  color: "#FFF",
                                  border: "none",
                                  borderRadius: 6,
                                  padding: "4px 8px",
                                  fontSize: "0.76rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                {isActing ? "Deleting..." : "Confirm"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmSlug(null)}
                                style={{
                                  background: "rgba(255,255,255,0.1)",
                                  color: "#FFF",
                                  border: "none",
                                  borderRadius: 6,
                                  padding: "4px 8px",
                                  fontSize: "0.76rem",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                              <Button
                                to={`/story/${story.slug}/edit`}
                                variant="ghost"
                                size="sm"
                                style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                                title="Edit post in Blogger editor"
                              >
                                <FiEdit3 size={13} />
                                <span>Edit</span>
                              </Button>

                              {!isDraft && (
                                <Button
                                  to={`/blog/${story.slug}`}
                                  variant="ghost"
                                  size="sm"
                                  style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                                  title="View published article"
                                >
                                  <FiExternalLink size={13} />
                                  <span>View</span>
                                </Button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleToggleStatus(story)}
                                disabled={isActing}
                                className="to-toolbar-btn"
                                style={{
                                  width: "auto",
                                  padding: "4px 8px",
                                  fontSize: "0.76rem",
                                  borderRadius: 6,
                                  border: "1px solid var(--border-subtle)",
                                }}
                                title={isDraft ? "Publish this draft" : "Revert article to draft"}
                              >
                                {isDraft ? (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#10B981" }}>
                                    <FiCheckCircle size={12} /> Publish
                                  </span>
                                ) : (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#F59E0B" }}>
                                    <FiRefreshCw size={12} /> Revert to Draft
                                  </span>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => setDeleteConfirmSlug(story.slug)}
                                className="to-toolbar-btn"
                                style={{ color: "#FCA5A5", borderRadius: 6 }}
                                title="Delete post"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 36,
              }}
            >
              <button
                type="button"
                className="to-pagination-btn"
                disabled={pageParam <= 1}
                onClick={() => updateQuery(searchKey, statusParam, labelParam, pageParam - 1)}
                aria-label="Previous Page"
              >
                <FiChevronLeft size={16} />
              </button>

              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`to-pagination-btn ${p === pageParam ? "to-pagination-btn--active" : ""}`}
                  onClick={() => updateQuery(searchKey, statusParam, labelParam, p)}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                className="to-pagination-btn"
                disabled={pageParam >= pages}
                onClick={() => updateQuery(searchKey, statusParam, labelParam, pageParam + 1)}
                aria-label="Next Page"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyStoriesPage;
