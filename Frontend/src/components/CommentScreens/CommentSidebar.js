import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StoryComments from "./StoryComments";
import AddComment from "./AddComment";

const CommentSidebar = ({ slug, sidebarShowStatus, setSidebarShowStatus, activeUser }) => {
  const [count, setCount] = useState(0);
  const [commentlist, setCommentList] = useState([]);

  const getStoryComments = useCallback(async () => {
    try {
      const { data } = await axios.get(`/comment/${slug}/getAllComment`);
      setCommentList(data.data || []);
      setCount(data.count || 0);
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  useEffect(() => {
    getStoryComments();
  }, [getStoryComments]);

  return (
    <aside
      className={
        sidebarShowStatus
          ? "Inclusive-comment-sidebar visible"
          : "Inclusive-comment-sidebar hidden"
      }
      aria-label="Article Responses"
    >
      <AddComment
        setSidebarShowStatus={setSidebarShowStatus}
        slug={slug}
        getStoryComments={getStoryComments}
        activeUser={activeUser}
        count={count}
      />

      <StoryComments commentlist={commentlist} activeUser={activeUser} count={count} />
    </aside>
  );
};

export default CommentSidebar;
