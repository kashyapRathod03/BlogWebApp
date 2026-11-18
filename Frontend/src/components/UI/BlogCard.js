import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import {
  formatArticleDate,
  getArticleExcerpt,
  getReadingTimeLabel,
} from "../../utils/articleUtils";
import "./ui.css";

const BlogCard = ({ story }) => {
  const category = story.category || "Engineering Insights";
  const imageSrc = story.image ? `/storyImages/${story.image}` : "/storyImages/default.jpg";

  return (
    <article className="to-card to-card--interactive to-blog-card">
      <Link to={`/blog/${story.slug}`} className="to-blog-card__media">
        <img src={imageSrc} alt={story.title} loading="lazy" />
      </Link>

      <div className="to-blog-card__body">
        <div className="to-blog-card__meta">
          <span className="to-badge to-badge--purple">{category}</span>
          {story.createdAt && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <FiCalendar size={12} aria-hidden="true" />
              {formatArticleDate(story.createdAt)}
            </span>
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <FiClock size={12} aria-hidden="true" />
            {getReadingTimeLabel(story)}
          </span>
        </div>

        <h3 className="to-blog-card__title">
          <Link to={`/blog/${story.slug}`}>{story.title}</Link>
        </h3>

        <p className="to-blog-card__excerpt">{getArticleExcerpt(story, 128)}</p>

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
