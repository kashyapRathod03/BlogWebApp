import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineWavingHand, MdWavingHand } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatArticleDate } from "../../utils/articleUtils";

const CommentItem = ({ comment, activeUser }) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    if (!activeUser?._id) return;
    let active = true;

    const getCommentLikeStatus = async () => {
      try {
        const { data } = await axios.post(
          `/comment/${comment._id}/getCommentLikeStatus`,
          { activeUser },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (active) setLikeStatus(Boolean(data.likeStatus));
      } catch (error) {
        if (active) setLikeStatus(false);
      }
    };

    getCommentLikeStatus();
    return () => {
      active = false;
    };
  }, [comment._id, activeUser]);

  const handleCommentLike = async () => {
    if (!activeUser?._id) {
      return navigate("/login");
    }

    try {
      const { data } = await axios.post(
        `/comment/${comment._id}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setLikeCount(data.data.likeCount);
      setLikeStatus(Boolean(data.likeStatus));
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <article className="to-comment-card">
      <div className="to-comment-card__top">
        <div className="to-comment-card__author">
          <img
            src={`/userPhotos/${comment.author?.photo || "user.png"}`}
            alt={comment.author?.username || "Reader"}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {comment.author?.username || "Member"}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {formatArticleDate(comment.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div
        className="to-comment-card__body"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />

      <div className="to-comment-card__footer">
        <button
          type="button"
          className="to-comment-like-btn"
          onClick={handleCommentLike}
          aria-label="Like response"
        >
          {likeStatus ? <MdWavingHand color="#00C9C8" /> : <MdOutlineWavingHand />}
          <span>{likeCount}</span>
        </button>

        <div style={{ display: "inline-flex", gap: 3 }}>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={13}
              color={comment.star > index ? "#00C9C8" : "rgba(255,255,255,0.16)"}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
