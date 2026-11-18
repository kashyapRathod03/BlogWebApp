import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import ReadListStoryItem from "../StoryScreens/ReadListStoryItem";
import LoadingState from "../UI/LoadingState";
import EmptyState from "../UI/EmptyState";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const ReadListPage = () => {
  const navigate = useNavigate();
  const [readList, setReadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { config, activeUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserReadingList = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/user/readList", config);
        setReadList((res.data?.data || []).filter(Boolean));
        setLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };
    getUserReadingList();
  }, [config, navigate]);

  return (
    <main className="to-editor-page">
      <SEOHead title="Reading List" canonicalPath="/readList" />
      <div className="to-container" style={{ maxWidth: 920 }}>
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <FiArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        <div style={{ marginBottom: 28 }}>
          <span className="to-eyebrow">Saved Articles</span>
          <h1 style={{ fontSize: "2rem", marginBottom: 6 }}>
            {activeUser?.username ? `${activeUser.username}'s Reading List` : "Reading List"}
          </h1>
          <p style={{ marginBottom: 0 }}>
            {readList.length} saved {readList.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {loading ? (
          <LoadingState message="Loading your reading list..." />
        ) : readList.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {readList.map((story) => (
              <ReadListStoryItem key={story._id} story={story} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your reading list is empty"
            description="Bookmark articles from TechOrcas Insights to keep technical references handy."
            actionLabel="Browse Blog"
            actionTo="/blog"
          />
        )}
      </div>
    </main>
  );
};

export default ReadListPage;
