import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { BLOG_CATEGORIES } from "../../data/siteData";
import Button from "../UI/Button";
import LoadingState from "../UI/LoadingState";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const STORY_CATEGORIES = BLOG_CATEGORIES.filter((c) => c !== "All");

const EditStory = () => {
  const { config } = useContext(AuthContext);
  const { slug } = useParams();
  const imageEl = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(STORY_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getStoryInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/story/editStory/${slug}`, config);
        const s = data.data;
        setTitle(s.title || "");
        setExcerpt(s.excerpt || "");
        setCategory(s.category || "Engineering Insights");
        setContent(s.content || "");
        setImage(s.image || "");
        setPreviousImage(s.image || "");
        setLoading(false);
      } catch (err) {
        navigate("/blog");
      }
    };
    getStoryInfo();
  }, [slug, config, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("excerpt", excerpt);
    formdata.append("category", category);
    formdata.append("content", content);
    formdata.append("image", image);
    formdata.append("previousImage", previousImage);

    try {
      const { data } = await axios.put(`/story/${slug}/edit`, formdata, {
        headers: {
          authorization: config?.headers?.authorization || `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Article updated successfully.");
      setTimeout(() => {
        navigate(`/blog/${data.data?.slug || slug}`);
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Could not update article.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="to-container" style={{ padding: "80px 24px" }}>
        <LoadingState message="Loading article editor..." />
      </div>
    );
  }

  return (
    <main className="to-editor-page">
      <SEOHead title={`Edit: ${title}`} canonicalPath={`/story/${slug}/edit`} />
      <div className="to-container to-editor-shell">
        <div style={{ marginBottom: 22 }}>
          <Link
            to={`/blog/${slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <FiArrowLeft size={16} /> Back to Article
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="to-card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: 0 }}>Edit Article</h1>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && (
            <div className="to-alert to-alert--success">
              <span>{success}</span>
              <Link to="/blog" style={{ textDecoration: "underline" }}>
                Go to Blog
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
                Short Subtitle / Excerpt
              </label>
              <input
                type="text"
                id="excerpt"
                className="to-input"
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
                data={content}
              />
            </div>
          </div>

          {previousImage && (
            <div className="to-field">
              <span className="to-label">Current Cover Image</span>
              <img
                src={`/storyImages/${previousImage}`}
                alt={title}
                style={{
                  maxHeight: 240,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 14,
                  border: "1px solid var(--border-subtle)",
                }}
              />
            </div>
          )}

          <div className="to-field">
            <label className="to-label">Replace Cover Image (Optional)</label>
            <div className="to-upload-zone">
              <AiOutlineUpload size={26} color="#00C9C8" />
              <div style={{ marginTop: 8, fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                {image === previousImage
                  ? "Click or drag to upload a new cover image"
                  : `Selected: ${image.name}`}
              </div>
              <input
                name="image"
                type="file"
                accept="image/*"
                ref={imageEl}
                onChange={(e) => {
                  if (e.target.files?.[0]) setImage(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" disabled={saving}>
              {saving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditStory;
