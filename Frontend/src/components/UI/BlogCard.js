import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiClock, FiEye } from "react-icons/fi";
import {
  formatArticleDate,
  getArticleExcerpt,
  getReadingTimeLabel,
  getImageUrl,
} from "../../utils/articleUtils";
import "./ui.css";

const BlogCard = ({ story }) => {
  const category = story.category || "Engineering Insights";
  const imageSrc = getImageUrl(story.image);

  return (
    <article className="to-card to-card--interactive to-blog-card">
      <Link to={`/blog/${story.slug}`} className="to-blog-card__media">
        <img src={imageSrc} alt={story.title} loading="lazy" />
      </Link>

      <div className="to-blog-card__body">
        <div className="to-blog-card__meta" style={{ flexWrap: "wrap", gap: 8 }}>
          <span className="to-badge to-badge--purple">{category}</span>
          {story.createdAt && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <FiCalendar size={12} aria-hidden="true" />
              {formatArticleDate(story.publishedAt || story.createdAt)}
            </span>
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <FiClock size={12} aria-hidden="true" />
            {getReadingTimeLabel(story)}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--accent-primary)" }}>
            <FiEye size={12} aria-hidden="true" />
            {story.views || 0}
          </span>
        </div>

        <h3 className="to-blog-card__title">
          <Link to={`/blog/${story.slug}`}>{story.title}</Link>
        </h3>

        <p className="to-blog-card__excerpt">{story.searchDescription || getArticleExcerpt(story, 128)}</p>

        {Array.isArray(story.labels) && story.labels.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
            {story.labels.slice(0, 3).map((lbl) => (
              <span
                key={lbl}
                style={{
                  fontSize: "0.72rem",
                  padding: "1px 6px",
                  borderRadius: 4,
                  background: "rgba(0, 201, 200, 0.1)",
                  color: "var(--accent-primary)",
                  border: "1px solid rgba(0, 201, 200, 0.2)",
                }}
              >
                #{lbl}
              </span>
            ))}
          </div>
        )}

        <div className="to-blog-card__footer">
          <span style={{ color: "var(--text-secondary)", fontSize: "0.84rem" }}>
            {story.author?.username ? `By ${story.author.username}` : "TechOrcas Insights"}
          </span>
          <Link to={`/blog/${story.slug}`} className="to-service-card__link">
            <span>Read Article</span>
            <FiArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
