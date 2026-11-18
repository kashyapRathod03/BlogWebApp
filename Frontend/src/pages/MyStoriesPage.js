import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiSearch,
  FiHeart,
  FiMessageSquare,
  FiLayers,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { BLOG_CATEGORIES } from "../data/siteData";
import { formatArticleDate, getReadingTimeLabel } from "../utils/articleUtils";
import PageHero from "../components/UI/PageHero";
import LoadingState from "../components/UI/LoadingState";
import EmptyState from "../components/UI/EmptyState";
import ErrorState from "../components/UI/ErrorState";
import Button from "../components/UI/Button";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const MyStoriesPage = () => {
  const { config, activeUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const searchKey = params.get("search") || "";
  const categoryParam = params.get("category") || "All";
  const pageParam = parseInt(params.get("page"), 10) || 1;

  const [searchInput, setSearchInput] = useState(searchKey);
  const [stories, setStories] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingSlug, setDeletingSlug] = useState(null);
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
      if (categoryParam && categoryParam !== "All") qs.set("category", categoryParam);
      qs.set("page", String(pageParam));
      qs.set("limit", "9");

      const { data } = await axios.get(`/story/myStories?${qs.toString()}`, config);
      setStories(data.data || []);
      setPages(data.pages || 1);
      setTotalCount(typeof data.total === "number" ? data.total : (data.data || []).length);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        navigate("/login");
        return;
      }
      setError("Could not load your authored stories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchKey, categoryParam, pageParam, config, navigate]);

  useEffect(() => {
    fetchMyStories();
  }, [fetchMyStories]);

  const updateQuery = (nextSearch, nextCategory, nextPage) => {
    const qs = new URLSearchParams();
    if (nextSearch) qs.set("search", nextSearch);
    if (nextCategory && nextCategory !== "All") qs.set("category", nextCategory);
    if (nextPage > 1) qs.set("page", String(nextPage));
    const queryStr = qs.toString();
    navigate(`/my-stories${queryStr ? `?${queryStr}` : ""}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery(searchInput.trim(), categoryParam, 1);
  };

  const handleDeleteStory = async (slug) => {
    setDeletingSlug(slug);
    try {
      await axios.delete(`/story/${slug}/delete`, config);
      setStories((prev) => prev.filter((item) => item.slug !== slug));
      setTotalCount((prev) => Math.max(0, prev - 1));
      setDeleteConfirmSlug(null);
    } catch (err) {
      alert("Failed to delete the article. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  };

  // Aggregate author stats across current loaded stories
  const totalLikes = stories.reduce((sum, s) => sum + (s.likeCount || 0), 0);
  const totalComments = stories.reduce((sum, s) => sum + (s.commentCount || 0), 0);

  return (
    <main>
      <SEOHead
        title="My Stories | Author Studio"
        description="Manage, edit, and track the performance of your authored articles on TechOrcas."
        canonicalPath="/my-stories"
      />

      <PageHero
        eyebrow="Author Studio"
        eyebrowTone="teal"
        title="Manage Your Articles & Insights."
        description={`Welcome back, ${activeUser?.username || "Author"}. Review and edit your published articles, monitor reader engagement, or craft your next deep-dive engineering story.`}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: "My Stories" },
        ]}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button to="/addstory" variant="primary">
            <FiPlus size={16} aria-hidden="true" />
            <span>Write New Article</span>
          </Button>
          <Button to="/blog" variant="ghost">
            <FiEye size={16} aria-hidden="true" />
            <span>View Public Blog</span>
          </Button>
        </div>
      </PageHero>

      <section className="to-section" style={{ paddingTop: 30 }}>
        <div className="to-container">
          {/* Metrics summary banner */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(0, 201, 200, 0.12)",
                  color: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiLayers size={22} />
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>
                  {totalCount}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
                  Authored Articles
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(168, 116, 255, 0.12)",
                  color: "var(--accent-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiHeart size={22} />
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>
                  {totalLikes}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
                  Reader Appreciations
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiMessageSquare size={22} />
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>
                  {totalComments}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>
                  Discussion Comments
                </div>
              </div>
            </div>
          </div>

          {/* Search bar & Category filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <form className="to-search-bar" onSubmit={handleSearchSubmit} style={{ maxWidth: 440, width: "100%" }}>
              <FiSearch size={18} color="#7C859E" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search your articles..."
                aria-label="Search my articles"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button type="submit" variant="primary" size="sm">
                Filter
              </Button>
            </form>

            <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Showing {stories.length} of {totalCount} article{totalCount === 1 ? "" : "s"}
            </div>
          </div>

          <div className="to-filter-bar" style={{ marginBottom: 32 }} role="tablist" aria-label="Article Categories">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={categoryParam === cat}
                className={`to-filter-pill ${categoryParam === cat ? "to-filter-pill--active" : ""}`}
                onClick={() => updateQuery(searchKey, cat, 1)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Content state */}
          {loading ? (
            <LoadingState message="Loading your authored articles..." />
          ) : error ? (
            <ErrorState description={error} onRetry={fetchMyStories} />
          ) : stories.length === 0 ? (
            <EmptyState
              title={
                searchKey || categoryParam !== "All"
                  ? "No matching articles in your library"
                  : "You haven't published any articles yet"
              }
              description={
                searchKey || categoryParam !== "All"
                  ? "Try resetting your search query or choosing another category filter."
                  : "Publish software engineering insights, case studies, or AI workflows to share your knowledge with TechOrcas."
              }
              actionLabel="Write Your First Story"
              onAction={() => navigate("/addstory")}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {stories.map((story) => {
                const readingTime = getReadingTimeLabel(story.readtime, story.content);
                const formattedDate = formatArticleDate(story.createdAt);
                const isConfirmingDelete = deleteConfirmSlug === story.slug;
                const isDeleting = deletingSlug === story.slug;

                return (
                  <article
                    key={story.slug}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform var(--transition-fast), border-color var(--transition-fast)",
                    }}
                  >
                    {/* Image Header */}
                    <div style={{ position: "relative", height: 180, background: "var(--bg-secondary)", overflow: "hidden" }}>
                      <img
                        src={`/storyImages/${story.image}`}
                        alt={story.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <span
                        className="to-badge to-badge--teal"
                        style={{ position: "absolute", top: 12, left: 12 }}
                      >
                        {story.category || "Engineering"}
                      </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 8,
                        }}
                      >
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span>{readingTime}</span>
                      </div>

                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: 10,
                          lineHeight: 1.35,
                        }}
                      >
                        <Link
                          to={`/blog/${story.slug}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {story.title}
                        </Link>
                      </h3>

                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.55,
                          marginBottom: 16,
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {story.excerpt || story.content?.replace(/<[^>]+>/g, "").slice(0, 140) + "..."}
                      </p>

                      {/* Metrics bar */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: 12,
                          borderTop: "1px solid var(--border-subtle)",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <FiHeart size={14} color="var(--accent-secondary)" />
                            {story.likeCount || 0}
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <FiMessageSquare size={14} color="var(--accent-primary)" />
                            {story.commentCount || 0}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "#6EE7B7" }}>● Published</span>
                      </div>

                      {/* Action buttons */}
                      {isConfirmingDelete ? (
                        <div
                          style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "var(--radius-sm)",
                            padding: "10px 12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                          }}
                        >
                          <span style={{ fontSize: "0.82rem", color: "#FCA5A5" }}>Delete this story?</span>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteStory(story.slug)}
                              disabled={isDeleting}
                              style={{
                                background: "#EF4444",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "var(--radius-sm)",
                                padding: "4px 10px",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                cursor: isDeleting ? "not-allowed" : "pointer",
                              }}
                            >
                              {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmSlug(null)}
                              disabled={isDeleting}
                              style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                color: "var(--text-primary)",
                                border: "none",
                                borderRadius: "var(--radius-sm)",
                                padding: "4px 10px",
                                fontSize: "0.78rem",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
                          <Button to={`/blog/${story.slug}`} variant="ghost" size="sm" style={{ padding: "6px 10px" }}>
                            <FiExternalLink size={13} />
                            <span>View</span>
                          </Button>
                          <Button
                            to={`/story/${story.slug}/edit`}
                            variant="secondary"
                            size="sm"
                            style={{ padding: "6px 10px" }}
                          >
                            <FiEdit3 size={13} />
                            <span>Edit</span>
                          </Button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmSlug(story.slug)}
                            aria-label={`Delete ${story.title}`}
                            style={{
                              background: "transparent",
                              border: "1px solid var(--border-subtle)",
                              borderRadius: "var(--radius-sm)",
                              color: "#FCA5A5",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "6px 12px",
                              cursor: "pointer",
                              transition: "background var(--transition-fast)",
                            }}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
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
                marginTop: 48,
              }}
            >
              <button
                type="button"
                className="to-pagination-btn"
                disabled={pageParam <= 1}
                onClick={() => updateQuery(searchKey, categoryParam, pageParam - 1)}
                aria-label="Previous Page"
              >
                <FiChevronLeft size={16} />
              </button>

              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`to-pagination-btn ${p === pageParam ? "to-pagination-btn--active" : ""}`}
                  onClick={() => updateQuery(searchKey, categoryParam, p)}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                className="to-pagination-btn"
                disabled={pageParam >= pages}
                onClick={() => updateQuery(searchKey, categoryParam, pageParam + 1)}
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
