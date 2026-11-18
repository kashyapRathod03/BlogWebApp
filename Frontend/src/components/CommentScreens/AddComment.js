import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import StarRating from "./StarRating";
import Button from "../UI/Button";
import "../../Css/AddComment.css";

const AddComment = ({ setSidebarShowStatus, slug, getStoryComments, activeUser, count }) => {
  const navigate = useNavigate();
  const [star, setStar] = useState(0);
  const [starCurrentVal, setStarCurrentVal] = useState(0);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        `/comment/${slug}/addComment`,
        { content: content.trim(), star },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSuccess("Response posted.");
      const commentCounter = document.querySelector(".commentCount");
      if (commentCounter) {
        commentCounter.textContent = String(count + 1);
      }

      setStar(0);
      setStarCurrentVal(0);
      setContent("");
      getStoryComments();

      setTimeout(() => setSuccess(""), 2800);
    } catch (err) {
      const msg = err.response?.data?.error || "Could not post response.";
      if (msg === "Jwt expired") {
        navigate("/login");
      } else {
        setError(msg);
        setTimeout(() => setError(""), 4500);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="to-comment-header">
        <h3 style={{ fontSize: "1.12rem", marginBottom: 0 }}>
          Responses (<span className="sidebar-commentCount">{count}</span>)
        </h3>
        <button
          type="button"
          className="to-comment-close"
          aria-label="Close responses"
          onClick={() => setSidebarShowStatus(false)}
        >
          <FiX size={18} />
        </button>
      </div>

      {error && <div className="to-alert to-alert--error">{error}</div>}
      {success && <div className="to-alert to-alert--success">{success}</div>}

      {activeUser && activeUser.username ? (
        <form className="to-comment-form" onSubmit={handleSubmit}>
          <div className="to-comment-user">
            <img
              src={`/userPhotos/${activeUser.photo || "user.png"}`}
              alt={activeUser.username}
            />
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{activeUser.username}</span>
          </div>

          <textarea
            className="to-comment-textarea"
            placeholder="Share your engineering perspective..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <StarRating
              setStar={setStar}
              setStarCurrentVal={setStarCurrentVal}
              starCurrentVal={starCurrentVal}
            />

            <Button type="submit" variant="primary" size="sm" disabled={!content.trim() || submitting}>
              {submitting ? "Posting..." : "Respond"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="to-card" style={{ padding: 18, marginBottom: 20 }}>
          <p style={{ fontSize: "0.9rem", marginBottom: 12 }}>
            Sign in to join the discussion and share a response.
          </p>
          <Link to="/login" className="to-btn to-btn--primary to-btn--sm">
            Sign In
          </Link>
        </div>
      )}
    </>
  );
};

export default AddComment;
