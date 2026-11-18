import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiOutlineUpload } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { BLOG_CATEGORIES } from "../../data/siteData";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const STORY_CATEGORIES = BLOG_CATEGORIES.filter((c) => c !== "All");

const AddStory = () => {
  const { config } = useContext(AuthContext);
  const imageEl = useRef(null);
  const editorEl = useRef(null);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(STORY_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setTitle("");
    setExcerpt("");
    setCategory(STORY_CATEGORIES[0]);
    setContent("");
    setImage("");
    if (editorEl.current?.editor) {
      editorEl.current.editor.setData("");
    }
    if (imageEl.current) {
      imageEl.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("excerpt", excerpt);
    formdata.append("category", category);
    formdata.append("image", image);
    formdata.append("content", content);

    setLoading(true);
    try {
      await axios.post("/story/addstory", formdata, {
        headers: {
          authorization: config?.headers?.authorization || `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Article published successfully.");
      clearInputs();
    } catch (err) {
      setError(err.response?.data?.error || "Could not publish article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="to-editor-page">
      <SEOHead title="Write Article" canonicalPath="/addstory" />
      <div className="to-container to-editor-shell">
        <div style={{ marginBottom: 22 }}>
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

        <form onSubmit={handleSubmit} className="to-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <span className="to-eyebrow to-eyebrow--purple" style={{ marginBottom: 10 }}>
              Editorial Studio
            </span>
            <h1 style={{ fontSize: "1.75rem", marginBottom: 4 }}>Publish an Engineering Article</h1>
            <p style={{ marginBottom: 0, fontSize: "0.94rem" }}>
              Use H2/H3 headings to automatically generate a reader Table of Contents.
            </p>
          </div>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && (
            <div className="to-alert to-alert--success">
              <span>{success}</span>
              <Link to="/blog" style={{ textDecoration: "underline" }}>
                View Blog
              </Link>
            </div>
          )}

          <div className="to-field">
            <label className="to-label" htmlFor="title">
              Article Title *
            </label>
            <input
              type="text"
              required
              id="title"
              className="to-input"
              placeholder="e.g., Designing Resilient RAG Pipelines with Spring AI"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div className="to-field">
              <label className="to-label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="to-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {STORY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="to-field">
              <label className="to-label" htmlFor="excerpt">
                Short Subtitle / Excerpt (Optional)
              </label>
              <input
                type="text"
                id="excerpt"
                className="to-input"
                placeholder="Concise one-line summary for readers"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </div>

          <div className="to-field">
            <label className="to-label">Article Content *</label>
            <div className="to-ckeditor-wrap">
              <CKEditor
                editor={ClassicEditor}
                onChange={(e, editor) => setContent(editor.getData())}
                ref={editorEl}
              />
            </div>
          </div>

          <div className="to-field">
            <label className="to-label">Featured Cover Image *</label>
            <div className="to-upload-zone">
              <AiOutlineUpload size={26} color="#00C9C8" />
              <div style={{ marginTop: 8, fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                {image
                  ? `Selected: ${image.name}`
                  : "Click or drag to upload a featured cover image for this article"}
              </div>
              <input
                name="image"
                type="file"
                accept="image/*"
                ref={imageEl}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" disabled={!image || loading}>
              {loading ? "Publishing..." : "Publish Article"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddStory;
