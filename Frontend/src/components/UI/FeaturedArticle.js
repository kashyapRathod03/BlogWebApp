import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import {
  formatArticleDate,
  getArticleExcerpt,
  getReadingTimeLabel,
  getImageUrl,
} from "../../utils/articleUtils";
import Button from "./Button";
import "./ui.css";

const FeaturedArticle = ({ story }) => {
  if (!story) return null;
  const category = story.category || "Engineering Insights";
  const imageSrc = getImageUrl(story.image);

  return (
    <article className="to-card to-featured-article">
      <Link to={`/blog/${story.slug}`} className="to-featured-article__media">
        <img src={imageSrc} alt={story.title} />
      </Link>

      <div className="to-featured-article__body">
        <div className="to-blog-card__meta" style={{ marginBottom: 0 }}>
          <span className="to-badge to-badge--teal">Featured Article</span>
          <span className="to-badge to-badge--purple">{category}</span>
        </div>

        <h2 style={{ fontSize: "clamp(1.45rem, 2.5vw, 2rem)", marginBottom: 0 }}>
          <Link to={`/blog/${story.slug}`}>{story.title}</Link>
        </h2>

        <p style={{ marginBottom: 0, fontSize: "0.98rem" }}>{getArticleExcerpt(story, 190)}</p>

        <div className="to-blog-card__meta" style={{ marginBottom: 4 }}>
          {story.author?.username && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiUser size={13} aria-hidden="true" />
              {story.author.username}
            </span>
          )}
          {story.createdAt && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiCalendar size={13} aria-hidden="true" />
              {formatArticleDate(story.createdAt)}
            </span>
          )}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <FiClock size={13} aria-hidden="true" />
            {getReadingTimeLabel(story)}
          </span>
        </div>

        <div>
          <Button to={`/blog/${story.slug}`} variant="primary">
            <span>Read Article</span>
            <FiArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;
