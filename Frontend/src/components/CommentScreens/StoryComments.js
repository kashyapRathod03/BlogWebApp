import React from "react";
import CommentItem from "./CommentItem";
import "../../Css/StoryComments.css";

const StoryComments = ({ commentlist, count, activeUser }) => (
  <div>
    {count > 0 && commentlist.length > 0 ? (
      <div>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 14,
          }}
        >
          Most Relevant
        </span>
        <div className="to-comment-list">
          {commentlist.map((comment) => (
            <CommentItem key={comment._id} comment={comment} activeUser={activeUser} />
          ))}
        </div>
      </div>
    ) : (
      <div className="to-card" style={{ padding: 20, textAlign: "center" }}>
        <p style={{ marginBottom: 0, fontSize: "0.9rem" }}>
          No responses yet. Be the first to share your thoughts.
        </p>
      </div>
    )}
  </div>
);

export default StoryComments;
