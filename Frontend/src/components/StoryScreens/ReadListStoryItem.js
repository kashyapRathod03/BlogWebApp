import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";
import {
  formatArticleDate,
  getArticleExcerpt,
  getReadingTimeLabel,
  getImageUrl,
} from "../../utils/articleUtils";

const ReadListStoryItem = ({ story }) => {
  if (!story) return null;

  return (
    <article className="to-card to-card--interactive to-readlist-item">
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          <span className="to-badge to-badge--purple">
            {story.category || "Engineering Insights"}
          </span>
          {story.author?.username && <span>{story.author.username}</span>}
          <span>·</span>
          <span>{formatArticleDate(story.createdAt)}</span>
          <span>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <FiClock size={12} /> {getReadingTimeLabel(story)}
          </span>
        </div>

        <h3 style={{ fontSize: "1.22rem", marginBottom: 8 }}>
          <Link to={`/blog/${story.slug}`}>{story.title}</Link>
        </h3>

        <p style={{ fontSize: "0.93rem", marginBottom: 14 }}>{getArticleExcerpt(story, 140)}</p>

        <Link to={`/blog/${story.slug}`} className="to-service-card__link">
          <span>Read Article</span>
          <FiArrowRight size={14} />
        </Link>
      </div>

      <div>
        <Link to={`/blog/${story.slug}`}>
          <img
            src={getImageUrl(story.image)}
            alt={story.title}
          />
        </Link>
      </div>
    </article>
  );
};

export default ReadListStoryItem;
