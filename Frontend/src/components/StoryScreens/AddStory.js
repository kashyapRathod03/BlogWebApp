import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import BloggerEditor from "./BloggerEditor";

const AddStory = () => {
  const { config } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

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

    if (payload.imageFile) {
      formdata.append("image", payload.imageFile);
    } else if (payload.image) {
      formdata.append("image", payload.image);
    }

    try {
      await axios.post("/story/addstory", formdata, {
        headers: {
          authorization:
            config?.headers?.authorization ||
            `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const isDraft = payload.status === "draft";
      setSuccess(
        isDraft
          ? "Post saved as draft! Redirecting to dashboard..."
          : "Article published successfully! Redirecting to dashboard..."
      );

      setTimeout(() => {
        navigate("/my-blogs");
      }, 1100);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Could not save article. Please check your connection and inputs."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <BloggerEditor
      isEdit={false}
      onSave={handleSave}
      saving={saving}
      error={error}
      success={success}
    />
  );
};

export default AddStory;
