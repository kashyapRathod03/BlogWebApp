import axios from "axios";
import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiHeart,
  FiMessageSquare,
  FiBookmark,
  FiShare2,
  FiCheck,
  FiList,
  FiEye,
} from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthContext";
import {
  formatArticleDate,
  getArticleExcerpt,
  getReadingTimeLabel,
  parseContentWithToc,
} from "../../utils/articleUtils";
import Breadcrumb from "../UI/Breadcrumb";
import BlogCard from "../UI/BlogCard";
import LoadingState from "../UI/LoadingState";
import SEOHead from "../UI/SEOHead";
import CommentSidebar from "../CommentScreens/CommentSidebar";
import "../../Css/DetailStory.css";
import "../../Css/Pages.css";

const DetailStory = () => {
  const { activeUser, refreshAuth } = useContext(AuthContext);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [story, setStory] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const proseRef = useRef(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const loadArticle = async () => {
      setLoading(true);
      let currentUser = {};

      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const authRes = await axios.get("/auth/private", {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          });
          currentUser = authRes.data.user || {};
        } catch (err) {
          currentUser = {};
        }
      }

      try {
        const [{ data }, listRes] = await Promise.all([
          axios.post(`/story/${slug}`, { activeUser: currentUser }),
          axios.get("/story/getAllStories?limit=12&page=1").catch(() => ({ data: { data: [] } })),
        ]);
        if (!active) return;

        const fetchedStory = data.data;
        setStory(fetchedStory);
        setLikeStatus(Boolean(data.likeStatus));
        setLikeCount(fetchedStory.likeCount || 0);
        setAllStories(listRes.data?.data || []);

        if (currentUser.readList && fetchedStory?._id) {
          setStoryReadListStatus(currentUser.readList.includes(fetchedStory._id));
        } else {
          setStoryReadListStatus(false);
        }
        setLoading(false);
      } catch (error) {
        if (!active) return;
        setStory(null);
        setLoading(false);
        navigate("/not-found", { replace: true });
      }
    };

    loadArticle();
    return () => {
      active = false;
    };
  }, [slug, navigate]);

  const { processedHtml, headings } = useMemo(
    () => parseContentWithToc(story?.content || ""),
    [story?.content]
  );

  // Enhance code blocks with copy button & track active heading in ToC
  useEffect(() => {
    const container = proseRef.current;
    if (!container) return;

    const preElements = container.querySelectorAll("pre");
    preElements.forEach((pre) => {
      if (pre.querySelector(".to-copy-code-btn")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "to-copy-code-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => {
        const codeText = pre.querySelector("code")?.textContent || pre.textContent || "";
        navigator.clipboard?.writeText(codeText);
        btn.textContent = "Copied";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 1600);
      });
      pre.appendChild(btn);
    });

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const target = container.querySelector(`#${CSS.escape(h.id)}`);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [processedHtml, headings]);

  const handleLike = async () => {
    if (!activeUser?._id) {
      return navigate("/login");
    }
    try {
      const { data } = await axios.post(
        `/story/${slug}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLikeStatus((prev) => !prev);
      setLikeCount(data.data.likeCount);
    } catch (error) {
      navigate("/login");
    }
  };

  const handleBookmark = async () => {
    if (!activeUser?._id) {
      return navigate("/login");
    }
    try {
      const { data } = await axios.post(
        `/user/${slug}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setStoryReadListStatus(Boolean(data.status));
      const badgeEl = document.getElementById("readListLength");
      if (badgeEl && data.user) {
        badgeEl.textContent = data.user.readListLength;
      }
      refreshAuth();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete this article?")) return;
    try {
      await axios.delete(`/story/${slug}/delete`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 1800);
  };

  if (loading || !story) {
    return (
      <div className="to-container" style={{ padding: "80px 24px" }}>
        <LoadingState message="Loading article..." />
      </div>
    );
  }

  const category = story.category || "Engineering Insights";
  const excerpt = getArticleExcerpt(story, 160);
  const currentIndex = allStories.findIndex((s) => s.slug === story.slug);
  const prevArticle = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allStories.length - 1
      ? allStories[currentIndex + 1]
      : null;
  const relatedArticles = allStories.filter((s) => s.slug !== story.slug).slice(0, 3);
  const isAuthor = Boolean(activeUser?._id && story.author?._id === activeUser._id);
  const updatedDiffers =
    story.updatedAt &&
    story.createdAt &&
    new Date(story.updatedAt).toDateString() !== new Date(story.createdAt).toDateString();

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(story.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: story.title,
        description: excerpt,
        image: story.image ? `${window.location.origin}/storyImages/${story.image}` : undefined,
        datePublished: story.createdAt,
        dateModified: story.updatedAt || story.createdAt,
        author: story.author?.username
          ? { "@type": "Person", name: story.author.username }
          : undefined,
        publisher: { "@type": "Organization", name: "TechOrcas" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${window.location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${window.location.origin}/blog` },
          { "@type": "ListItem", position: 3, name: story.title },
        ],
      },
    ],
  };

  return (
    <main className="to-article-page">
      <SEOHead
        title={story.title}
        description={story.searchDescription || story.excerpt || excerpt}
        canonicalPath={`/blog/${story.slug}`}
        ogType="article"
        ogImage={story.image ? `/storyImages/${story.image}` : undefined}
        jsonLd={jsonLd}
      />

      <div className="to-container">
        <header className="to-article-header">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: category, to: `/blog?category=${encodeURIComponent(category)}` },
              { label: story.title },
            ]}
          />

          <span className="to-badge to-badge--purple">{category}</span>
          <h1 className="to-article-title">{story.title}</h1>

          {story.excerpt && <p className="to-article-subtitle">{story.excerpt}</p>}

          {Array.isArray(story.labels) && story.labels.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "10px 0 16px" }}>
              {story.labels.map((lbl) => (
                <Link
                  key={lbl}
                  to={`/blog?label=${encodeURIComponent(lbl)}`}
                  className="to-sidebar-chip"
                  style={{ textDecoration: "none" }}
                >
                  #{lbl}
                </Link>
              ))}
            </div>
          )}

          <div className="to-article-meta-bar">
            <div className="to-article-author">
              {story.author && (
                <img
                  src={`/userPhotos/${story.author.photo || "user.png"}`}
                  alt={story.author.username}
                />
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {story.author?.username || "TechOrcas Engineering"}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 14px",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <FiCalendar size={12} aria-hidden="true" />
                    {formatArticleDate(story.publishedAt || story.createdAt)}
                  </span>
                  {updatedDiffers && (
                    <span>Updated {formatArticleDate(story.updatedAt)}</span>
                  )}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <FiClock size={12} aria-hidden="true" />
                    {getReadingTimeLabel(story)}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--accent-primary)" }}>
                    <FiEye size={12} aria-hidden="true" />
                    {story.views || 0} views
                  </span>
                </div>
              </div>
            </div>

            <div className="to-article-actions-bar">
              <button
                type="button"
                className={`to-action-pill ${likeStatus ? "to-action-pill--active" : ""}`}
                onClick={handleLike}
                aria-label="Like article"
              >
                <FiHeart size={15} />
                <span className="likecount">{likeCount}</span>
              </button>

              <button
                type="button"
                className="to-action-pill"
                onClick={() => setSidebarShowStatus(true)}
                aria-label="Open responses"
              >
                <FiMessageSquare size={15} />
                <span className="commentCount">{story.commentCount || 0}</span>
              </button>

              <button
                type="button"
                className={`to-action-pill ${storyReadListStatus ? "to-action-pill--active" : ""}`}
                onClick={handleBookmark}
                aria-label="Save to reading list"
              >
                {storyReadListStatus ? <BsBookmarkFill size={14} /> : <FiBookmark size={15} />}
                <span>{storyReadListStatus ? "Saved" : "Save"}</span>
              </button>

              {isAuthor && (
                <>
                  <Link to={`/story/${story.slug}/edit`} className="to-action-pill">
                    <FiEdit2 size={14} />
                    <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    className="to-action-pill to-action-pill--danger"
                    onClick={handleDelete}
                  >
                    <FiTrash2 size={14} />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="to-article-layout">
          <div>
            {headings.length > 0 && (
              <details className="to-card to-toc-mobile" style={{ padding: 18 }}>
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FiList size={16} color="#00C9C8" /> Table of Contents
                </summary>
                <ul className="to-toc-list">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`to-toc-link ${h.level === 3 ? "to-toc-link--h3" : ""}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {story.image && (
              <img
                className="to-article-hero-img"
                src={`/storyImages/${story.image}`}
                alt={story.title}
              />
            )}

            <article
              ref={proseRef}
              className="to-article-prose"
              dangerouslySetInnerHTML={{ __html: processedHtml }}
            />

            {/* Share Bar */}
            <div className="to-share-row">
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>
                  Share this engineering perspective
                </strong>
                <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
                  Discuss architecture and implementation details with your team.
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <button type="button" className="to-action-pill" onClick={handleCopyUrl}>
                  {copiedUrl ? <FiCheck size={14} color="#00C9C8" /> : <FiShare2 size={14} />}
                  <span>{copiedUrl ? "Link Copied" : "Copy Link"}</span>
                </button>
                <a
                  className="to-action-pill"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="to-action-pill"
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  X / Twitter
                </a>
              </div>
            </div>

            {/* Previous / Next Navigation */}
            {(prevArticle || nextArticle) && (
              <div className="to-prev-next">
                <div>
                  {prevArticle && (
                    <Link
                      to={`/blog/${prevArticle.slug}`}
                      className="to-card to-card--interactive"
                      style={{ display: "block", padding: 18, height: "100%" }}
                    >
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <FiArrowLeft size={13} /> Previous Article
                      </span>
                      <div style={{ fontWeight: 600, marginTop: 6 }}>{prevArticle.title}</div>
                    </Link>
                  )}
                </div>
                <div>
                  {nextArticle && (
                    <Link
                      to={`/blog/${nextArticle.slug}`}
                      className="to-card to-card--interactive"
                      style={{ display: "block", padding: 18, height: "100%", textAlign: "right" }}
                    >
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        Next Article <FiArrowRight size={13} />
                      </span>
                      <div style={{ fontWeight: 600, marginTop: 6 }}>{nextArticle.title}</div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Table of Contents & Quick Engagement */}
          <aside className="to-toc-desktop" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {headings.length > 0 && (
              <div className="to-toc-box">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.76rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-primary)",
                  }}
                >
                  On This Page
                </span>
                <ul className="to-toc-list">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={`to-toc-link ${h.level === 3 ? "to-toc-link--h3" : ""} ${
                          activeHeadingId === h.id ? "to-toc-link--active" : ""
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="to-card" style={{ padding: 20 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-secondary)",
                  textTransform: "uppercase",
                }}
              >
                Need Custom Engineering?
              </span>
              <p style={{ fontSize: "0.88rem", marginTop: 8, marginBottom: 14 }}>
                Explore how TechOrcas applies these architectures to production software.
              </p>
              <Link to="/contact" className="to-btn to-btn--primary to-btn--sm" style={{ width: "100%" }}>
                Let&apos;s Talk
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: 72, paddingTop: 48, borderTop: "1px solid var(--border-subtle)" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: 24 }}>Related Engineering Articles</h2>
            <div className="to-grid-3">
              {relatedArticles.map((rel) => (
                <BlogCard key={rel._id} story={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Comments Drawer */}
      {sidebarShowStatus && (
        <div
          className="to-comment-backdrop"
          onClick={() => setSidebarShowStatus(false)}
          aria-hidden="true"
        />
      )}
      <CommentSidebar
        slug={slug}
        sidebarShowStatus={sidebarShowStatus}
        setSidebarShowStatus={setSidebarShowStatus}
        activeUser={activeUser}
      />
    </main>
  );
};

export default DetailStory;
