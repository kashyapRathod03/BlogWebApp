import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiEdit3, FiChevronLeft, FiChevronRight, FiHeart, FiMessageSquare } from "react-icons/fi";
import { BLOG_CATEGORIES } from "../data/siteData";
import { AuthContext } from "../Context/AuthContext";
import { formatArticleDate, getReadingTimeLabel } from "../utils/articleUtils";
import PageHero from "../components/UI/PageHero";
import FeaturedArticle from "../components/UI/FeaturedArticle";
import BlogCard from "../components/UI/BlogCard";
import NewsletterForm from "../components/UI/NewsletterForm";
import CTASection from "../components/UI/CTASection";
import LoadingState from "../components/UI/LoadingState";
import EmptyState from "../components/UI/EmptyState";
import ErrorState from "../components/UI/ErrorState";
import Button from "../components/UI/Button";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const BlogPage = () => {
  const { activeUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const searchKey = params.get("search") || "";
  const categoryParam = params.get("category") || "All";
  const pageParam = parseInt(params.get("page"), 10) || 1;

  const [searchInput, setSearchInput] = useState(searchKey);
  const [stories, setStories] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchInput(searchKey);
  }, [searchKey]);

  const fetchStories = async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams();
      if (searchKey) qs.set("search", searchKey);
      if (categoryParam && categoryParam !== "All") qs.set("category", categoryParam);
      qs.set("page", String(pageParam));
      qs.set("limit", "7");

      const { data } = await axios.get(`/story/getAllStories?${qs.toString()}`);
      setStories(data.data || []);
      setPages(data.pages || 1);
    } catch (err) {
      setError("Could not load articles right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, categoryParam, pageParam]);

  const updateQuery = (nextSearch, nextCategory, nextPage) => {
    const qs = new URLSearchParams();
    if (nextSearch) qs.set("search", nextSearch);
    if (nextCategory && nextCategory !== "All") qs.set("category", nextCategory);
    if (nextPage > 1) qs.set("page", String(nextPage));
    const queryStr = qs.toString();
    navigate(`/blog${queryStr ? `?${queryStr}` : ""}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery(searchInput.trim(), categoryParam, 1);
  };

  const showFeatured = pageParam === 1 && !searchKey && stories.length > 0;
  const featuredStory = showFeatured ? stories[0] : null;
  const gridStories = showFeatured ? stories.slice(1) : stories;
  const popularStories =
    stories.length > 1
      ? [...stories]
          .sort((a, b) => (b.likeCount || 0) + (b.commentCount || 0) - ((a.likeCount || 0) + (a.commentCount || 0)))
          .slice(0, 3)
      : [];

  return (
    <main>
      <SEOHead
        title="Blog & Engineering Insights"
        description="Explore technology trends, software engineering practices, AI innovations, and ideas shaping the digital world."
        canonicalPath="/blog"
      />

      <PageHero
        eyebrow="TechOrcas Publication"
        eyebrowTone="purple"
        title="Ideas, Insights & Engineering Perspectives."
        description="Explore technology trends, software engineering practices, AI innovations and ideas shaping the digital world."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      >
        <form className="to-search-bar" onSubmit={handleSearchSubmit} style={{ width: "100%" }}>
          <FiSearch size={18} color="#7C859E" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search engineering articles..."
            aria-label="Search articles"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>

        {activeUser && activeUser.username ? (
          <Button to="/addstory" variant="secondary">
            <FiEdit3 size={15} aria-hidden="true" />
            <span>Write Article</span>
          </Button>
        ) : (
          <Button to="/login" variant="secondary">
            Author Sign In
          </Button>
        )}
      </PageHero>

      <section className="to-section" style={{ paddingTop: 40 }}>
        <div className="to-container">
          {/* Category Navigation */}
          <div className="to-filter-bar" style={{ marginBottom: 36 }} role="tablist" aria-label="Blog Categories">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={categoryParam === category}
                className={`to-filter-pill ${categoryParam === category ? "to-filter-pill--active" : ""}`}
                onClick={() => updateQuery(searchKey, category, 1)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingState message="Fetching articles from TechOrcas Insights..." />
          ) : error ? (
            <ErrorState description={error} onRetry={fetchStories} />
          ) : stories.length === 0 ? (
            <EmptyState
              title={searchKey || categoryParam !== "All" ? "No matching articles found" : "No articles published yet"}
              description={
                searchKey || categoryParam !== "All"
                  ? "Try clearing your search filter or exploring another engineering category."
                  : "Be the first contributor to publish a technical article on TechOrcas Insights."
              }
              actionLabel={
                searchKey || categoryParam !== "All"
                  ? "Clear Filters"
                  : activeUser?.username
                  ? "Publish First Article"
                  : "Sign In to Publish"
              }
              actionTo={
                searchKey || categoryParam !== "All"
                  ? undefined
                  : activeUser?.username
                  ? "/addstory"
                  : "/login"
              }
              onAction={
                searchKey || categoryParam !== "All"
                  ? () => updateQuery("", "All", 1)
                  : undefined
              }
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {featuredStory && <FeaturedArticle story={featuredStory} />}

              {gridStories.length > 0 && (
                <div>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: 22 }}>
                    {searchKey
                      ? `Search Results for "${searchKey}"`
                      : categoryParam !== "All"
                      ? `${categoryParam} Articles`
                      : "Latest Articles"}
                  </h2>
                  <div className="to-grid-3">
                    {gridStories.map((story) => (
                      <BlogCard key={story._id} story={story} />
                    ))}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {pages > 1 && (
                <div className="to-pagination" aria-label="Blog Pagination">
                  <button
                    type="button"
                    disabled={pageParam <= 1}
                    onClick={() => updateQuery(searchKey, categoryParam, pageParam - 1)}
                    aria-label="Previous page"
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={p === pageParam ? "to-page--active" : ""}
                      onClick={() => updateQuery(searchKey, categoryParam, p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={pageParam >= pages}
                    onClick={() => updateQuery(searchKey, categoryParam, pageParam + 1)}
                    aria-label="Next page"
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Popular Articles (only when multiple real articles exist) */}
              {popularStories.length > 1 && (
                <div style={{ paddingTop: 12 }}>
                  <h2 style={{ fontSize: "1.45rem", marginBottom: 20 }}>Most Discussed Articles</h2>
                  <div className="to-grid-3">
                    {popularStories.map((story) => (
                      <Link
                        key={`pop-${story._id}`}
                        to={`/blog/${story.slug}`}
                        className="to-card to-card--interactive"
                        style={{ display: "flex", flexDirection: "column", gap: 10 }}
                      >
                        <span className="to-badge to-badge--teal" style={{ alignSelf: "flex-start" }}>
                          {story.category || "Engineering Insights"}
                        </span>
                        <h3 style={{ fontSize: "1.08rem", marginBottom: 0 }}>{story.title}</h3>
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: 8,
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.82rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <span>
                            {formatArticleDate(story.createdAt)} · {getReadingTimeLabel(story)}
                          </span>
                          <span style={{ display: "inline-flex", gap: 10 }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <FiHeart size={13} /> {story.likeCount || 0}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <FiMessageSquare size={13} /> {story.commentCount || 0}
                            </span>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Newsletter Subscription */}
          <div style={{ marginTop: 64 }}>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Discuss Software Engineering or AI Automation?"
        description="Connect with the TechOrcas team to explore custom digital product development for your business."
        primaryLabel="Start a Conversation"
        primaryTo="/contact"
        secondaryLabel="Explore Services"
        secondaryTo="/services"
      />
    </main>
  );
};

export default BlogPage;
