import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import BloggerEditor from "./BloggerEditor";
import LoadingState from "../UI/LoadingState";

const EditStory = () => {
  const { config } = useContext(AuthContext);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [storyData, setStoryData] = useState(null);
  const [previousImage, setPreviousImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getStoryInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/story/editStory/${slug}`, {
          headers: {
            authorization:
              config?.headers?.authorization ||
              `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const s = data.data;
        setStoryData({
          title: s.title || "",
          content: s.content || "",
          excerpt: s.excerpt || "",
          searchDescription: s.searchDescription || s.excerpt || "",
          category: s.category || "Engineering Insights",
          labels: s.labels || [],
          status: s.status || "published",
          customSlug: s.customSlug || "",
          publishedAt: s.publishedAt || s.createdAt,
          image: s.image || "",
        });
        setPreviousImage(s.image || "");
        setLoading(false);
      } catch (err) {
        navigate("/my-blogs");
      }
    };
    getStoryInfo();
  }, [slug, config, navigate]);

  const handleSave = async (payload) => {
    setError("");
    setSuccess("");
    setSaving(true);

    const formdata = new FormData();
    formdata.append("title", payload.title);
    formdata.append("content", payload.content);
    formdata.append("excerpt", payload.excerpt);
    formdata.append("searchDescription", payload.searchDescription);
    formdata.append("category", payload.category);
    formdata.append("status", payload.status);
    formdata.append("customSlug", payload.customSlug || "");
    formdata.append("publishedAt", payload.publishedAt);
    formdata.append("labels", (payload.labels || []).join(","));
    formdata.append("previousImage", previousImage);

    if (payload.imageFile) {
      formdata.append("image", payload.imageFile);
    } else if (storyData?.image) {
      formdata.append("image", storyData.image);
    }

    try {
      const { data } = await axios.put(`/story/${slug}/edit`, formdata, {
        headers: {
          authorization:
            config?.headers?.authorization ||
            `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const isDraft = payload.status === "draft";
      setSuccess(
        isDraft
          ? "Post updated and kept in drafts!"
          : "Article updated and published successfully!"
      );

      const targetSlug = data.data?.slug || slug;
      setTimeout(() => {
        if (isDraft) {
          navigate("/my-blogs");
        } else {
          navigate(`/blog/${targetSlug}`);
        }
      }, 1100);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Could not update article. Please check your connection and inputs."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "100px 24px", minHeight: "100vh", background: "var(--bg-primary)" }}>
        <LoadingState message="Loading your article into Blogger editor..." />
      </div>
    );
  }

  return (
    <BloggerEditor
      initialData={storyData}
      isEdit={true}
      onSave={handleSave}
      saving={saving}
      error={error}
      success={success}
    />
  );
};

export default EditStory;
