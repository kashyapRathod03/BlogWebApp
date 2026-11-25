import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiEye,
  FiSave,
  FiSend,
  FiSettings,
  FiCode,
  FiEdit,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiImage,
  FiX,
  FiCalendar,
  FiTag,
  FiGlobe,
  FiCheck,
} from "react-icons/fi";
import { BLOG_CATEGORIES } from "../../data/siteData";
import { formatArticleDate, getReadingTimeLabel, getImageUrl } from "../../utils/articleUtils";
import OptimizedImage from "../common/OptimizedImage";
import SEOHead from "../UI/SEOHead";
import "../../Css/BloggerEditor.css";

const STORY_CATEGORIES = BLOG_CATEGORIES.filter((c) => c !== "All");

const BloggerEditor = ({
  initialData = {},
  isEdit = false,
  onSave,
  saving = false,
  error = "",
  success = "",
}) => {
  // Form states
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || STORY_CATEGORIES[0]);
  const [labels, setLabels] = useState(initialData.labels || []);
  const [labelInput, setLabelInput] = useState("");
  const [searchDescription, setSearchDescription] = useState(initialData.searchDescription || initialData.excerpt || "");
  const [permalinkType, setPermalinkType] = useState(initialData.customSlug ? "custom" : "auto");
  const [customSlug, setCustomSlug] = useState(initialData.customSlug || "");
  const [scheduleType, setScheduleType] = useState(initialData.publishedAt ? "custom" : "auto");
  const [publishedAt, setPublishedAt] = useState(
    initialData.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(initialData.image || "");
  const [imagePreview, setImagePreview] = useState(
    initialData.image ? getImageUrl(initialData.image) : ""
  );

  // Editor mode & UI states
  const [mode, setMode] = useState("compose"); // "compose" | "html"
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedSelectionRef = useRef(null);

  // Sync content with canvas on initial load or mode switch
  useEffect(() => {
    if (canvasRef.current && mode === "compose") {
      if (canvasRef.current.innerHTML !== content) {
        canvasRef.current.innerHTML = content || "<p><br></p>";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Generate automatic slug preview
  const autoSlug = title
    ? title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    : "untitled-post";

  const effectiveSlug = permalinkType === "custom" && customSlug.trim() ? customSlug.trim() : autoSlug;

  // Formatting execution
  const executeFormat = (command, value = null) => {
    if (mode !== "compose") return;
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (canvasRef.current) {
      setContent(canvasRef.current.innerHTML);
    }
  };

  const handleHeadingChange = (e) => {
    const val = e.target.value;
    if (!val) return;
    executeFormat("formatBlock", `<${val}>`);
    e.target.value = "";
  };

  const handleCanvasInput = () => {
    if (canvasRef.current) {
      setContent(canvasRef.current.innerHTML);
    }
  };

  const handleHtmlChange = (e) => {
    setContent(e.target.value);
  };

  // Link Insertion
  const openLinkModal = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
      setLinkText(selection.toString());
    }
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const applyLink = (e) => {
    e.preventDefault();
    if (!linkUrl) return;
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
    if (savedSelectionRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelectionRef.current);
    }
    if (linkText) {
      executeFormat("insertHTML", `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
    } else {
      executeFormat("createLink", linkUrl);
    }
    setShowLinkModal(false);
  };

  // Image Insertion
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("image", file);
        const token = localStorage.getItem("authToken");
        const res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.data?.url) {
          setUploadedImageUrl(res.data.url);
          setImagePreview(getImageUrl(res.data.url));
        }
      } catch (uploadErr) {
        console.warn("Direct upload notice, fallback to submission upload:", uploadErr.message);
      }
    }
  };

  const applyImageUrl = (e) => {
    e.preventDefault();
    if (!imageUrlInput) return;
    executeFormat("insertHTML", `<img src="${imageUrlInput}" alt="${title || 'Article Image'}" style="max-width:100%; border-radius:8px; margin: 16px 0;" />`);
    setImageUrlInput("");
    setShowImageUrlModal(false);
  };

  // Tag/Label handling
  const handleAddLabel = () => {
    if (!labelInput.trim()) return;
    const parts = labelInput
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !labels.includes(p));
    if (parts.length > 0) {
      setLabels([...labels, ...parts]);
    }
    setLabelInput("");
  };

  const handleRemoveLabel = (labelToRemove) => {
    setLabels(labels.filter((l) => l !== labelToRemove));
  };

  const handleLabelKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddLabel();
    }
  };

  // Submit Handler
  const handleAction = (statusTarget) => {
    if (!title.trim()) {
      alert("Please provide an article title before saving.");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      alert("Please provide content for your article.");
      return;
    }

    const payload = {
      title: title.trim(),
      content,
      excerpt: searchDescription.trim() || title.trim(),
      searchDescription: searchDescription.trim(),
      category,
      labels,
      status: statusTarget,
      customSlug: permalinkType === "custom" ? customSlug.trim() : "",
      publishedAt: scheduleType === "custom" ? publishedAt : new Date().toISOString(),
      imageFile,
      image: uploadedImageUrl || initialData.image || "",
    };

    onSave(payload);
  };

  const readingTime = getReadingTimeLabel(null, content);
  const formattedPreviewDate = formatArticleDate(
    scheduleType === "custom" && publishedAt ? publishedAt : new Date()
  );

  return (
    <div className="to-blogger-editor">
      <SEOHead
        title={title ? `${title} - Post Editor` : "Blogger Post Editor"}
        description="Craft, format, and publish articles with the Blogger-style editorial studio."
      />

      {/* Top Action Bar */}
      <header className="to-editor-topbar">
        <div className="to-editor-topbar__left">
          <Link
            to="/my-blogs"
            className="to-editor-back-btn"
            title="Return to Creator Dashboard"
          >
            <FiArrowLeft size={16} />
            <span>Dashboard</span>
          </Link>

          <input
            type="text"
            className="to-editor-title-input"
            placeholder="Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="to-editor-topbar__right">
          {/* Mode Switch: Compose vs HTML */}
          <div className="to-editor-mode-switch" role="group" aria-label="Editor Mode">
            <button
              type="button"
              className={`to-editor-mode-btn ${mode === "compose" ? "to-editor-mode-btn--active" : ""}`}
              onClick={() => setMode("compose")}
              title="Visual Compose Mode"
            >
              <FiEdit size={14} /> Compose
            </button>
            <button
              type="button"
              className={`to-editor-mode-btn ${mode === "html" ? "to-editor-mode-btn--active" : ""}`}
              onClick={() => setMode("html")}
              title="Raw HTML Mode"
            >
              <FiCode size={14} /> &lt;&gt; HTML
            </button>
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            className="to-toolbar-btn"
            style={{ width: "auto", padding: "6px 12px", gap: 6, fontSize: "0.85rem", fontWeight: 600 }}
            onClick={() => setShowPreview(true)}
            title="Preview article"
          >
            <FiEye size={15} /> Preview
          </button>

          <button
            type="button"
            className="to-toolbar-btn"
            style={{
              width: "auto",
              padding: "6px 14px",
              gap: 6,
              fontSize: "0.85rem",
              fontWeight: 600,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#FBBF24",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
            disabled={saving}
            onClick={() => handleAction("draft")}
            title="Save as Draft"
          >
            <FiSave size={15} /> {saving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            className="to-toolbar-btn"
            style={{
              width: "auto",
              padding: "6px 16px",
              gap: 6,
              fontSize: "0.85rem",
              fontWeight: 700,
              background: "var(--accent-primary, #00C9C8)",
              color: "#0A0F29",
              border: "none",
            }}
            disabled={saving}
            onClick={() => handleAction("published")}
            title="Publish Article"
          >
            <FiSend size={15} /> {saving ? "Publishing..." : isEdit ? "Update & Publish" : "Publish"}
          </button>

          {/* Settings Sidebar Toggle */}
          <button
            type="button"
            className={`to-toolbar-btn ${sidebarOpen ? "to-toolbar-btn--active" : ""}`}
            onClick={() => setSidebarOpen((prev) => !prev)}
            title="Toggle Post Settings"
          >
            <FiSettings size={16} />
          </button>
        </div>
      </header>

      {/* Notifications */}
      {error && (
        <div
          style={{
            padding: "10px 24px",
            background: "rgba(239, 68, 68, 0.15)",
            borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#FCA5A5",
            fontSize: "0.88rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div
          style={{
            padding: "10px 24px",
            background: "rgba(16, 185, 129, 0.15)",
            borderBottom: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#6EE7B7",
            fontSize: "0.88rem",
          }}
        >
          <span>{success}</span>
        </div>
      )}

      {/* Main Writing Canvas & Post Settings */}
      <div className="to-editor-main">
        <div className="to-editor-canvas-wrap">
          {/* Rich Text Toolbar (shown in Compose mode) */}
          {mode === "compose" && (
            <div className="to-editor-toolbar" role="toolbar" aria-label="Rich Text Formatting">
              {/* Headings Selector */}
              <select
                className="to-toolbar-select"
                onChange={handleHeadingChange}
                defaultValue=""
                title="Select Heading Level"
              >
                <option value="" disabled>
                  Paragraph / Heading
                </option>
                <option value="p">Normal text (Paragraph)</option>
                <option value="h1">Heading 1 (H1)</option>
                <option value="h2">Heading 2 (H2)</option>
                <option value="h3">Heading 3 (H3)</option>
                <option value="h4">Heading 4 (H4)</option>
              </select>

              <div className="to-toolbar-divider" />

              {/* Bold, Italic, Underline, Strikethrough */}
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("bold")}
                title="Bold (Ctrl+B)"
              >
                <FiBold size={15} />
              </button>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("italic")}
                title="Italic (Ctrl+I)"
              >
                <FiItalic size={15} />
              </button>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("underline")}
                title="Underline (Ctrl+U)"
              >
                <FiUnderline size={15} />
              </button>

              <div className="to-toolbar-divider" />

              {/* Lists */}
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("insertUnorderedList")}
                title="Bulleted List"
              >
                <FiList size={15} />
              </button>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("insertOrderedList")}
                title="Numbered List"
              >
                1.
              </button>

              <div className="to-toolbar-divider" />

              {/* Blockquote & Code */}
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("formatBlock", "<blockquote>")}
                title="Quote"
              >
                “
              </button>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("formatBlock", "<pre>")}
                title="Code Block"
              >
                <FiCode size={15} />
              </button>

              <div className="to-toolbar-divider" />

              {/* Insert Link & Image */}
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={openLinkModal}
                title="Insert or Edit Link"
              >
                <FiLink size={15} />
              </button>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => setShowImageUrlModal(true)}
                title="Insert Image by URL"
              >
                <FiImage size={15} />
              </button>

              <div className="to-toolbar-divider" />

              {/* Clear Formatting */}
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => executeFormat("removeFormat")}
                title="Clear Formatting"
                style={{ fontSize: "0.8rem", width: "auto", padding: "0 8px" }}
              >
                Clear
              </button>
            </div>
          )}

          {/* Canvas: Compose Mode */}
          {mode === "compose" ? (
            <div
              ref={canvasRef}
              className="to-editor-canvas"
              contentEditable
              suppressContentEditableWarning
              onInput={handleCanvasInput}
              data-placeholder="Tell your story... Write your article here, select text to format, or insert code blocks, links, and imagery."
            />
          ) : (
            /* Canvas: Raw HTML Mode */
            <div className="to-editor-html-view">
              <textarea
                className="to-editor-html-textarea"
                value={content}
                onChange={handleHtmlChange}
                placeholder="<h2>Subheading</h2><p>Write raw HTML markup here...</p>"
                spellCheck={false}
              />
            </div>
          )}
        </div>

        {/* Collapsible Post Settings Sidebar */}
        <aside
          className={`to-editor-sidebar ${!sidebarOpen ? "to-editor-sidebar--collapsed" : ""}`}
          aria-label="Post Settings"
        >
          <div className="to-editor-sidebar__header">
            <div className="to-editor-sidebar__title">
              <FiSettings size={15} color="var(--accent-primary)" />
              <span>Post Settings</span>
            </div>
            <button
              type="button"
              className="to-toolbar-btn"
              onClick={() => setSidebarOpen(false)}
              title="Close Settings"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Section 1: Labels / Tags */}
          <div className="to-sidebar-section">
            <div className="to-sidebar-section__title">
              <FiTag size={13} color="var(--accent-primary)" />
              <span>Labels / Tags</span>
            </div>
            <div className="to-sidebar-tag-input-wrap">
              <input
                type="text"
                className="to-sidebar-input"
                placeholder="Separate with commas..."
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                onKeyDown={handleLabelKeyDown}
              />
              <button
                type="button"
                onClick={handleAddLabel}
                className="to-toolbar-btn"
                style={{ background: "rgba(0, 201, 200, 0.15)", color: "var(--accent-primary)", borderRadius: 8 }}
                title="Add Label"
              >
                <FiCheck size={14} />
              </button>
            </div>
            <div className="to-sidebar-chips">
              {labels.map((lbl) => (
                <span key={lbl} className="to-sidebar-chip">
                  <span>{lbl}</span>
                  <button type="button" onClick={() => handleRemoveLabel(lbl)}>
                    <FiX size={12} />
                  </button>
                </span>
              ))}
              {labels.length === 0 && (
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  No labels attached yet.
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Published Date / Schedule */}
          <div className="to-sidebar-section">
            <div className="to-sidebar-section__title">
              <FiCalendar size={13} color="var(--accent-secondary)" />
              <span>Published Date</span>
            </div>
            <div className="to-sidebar-radio-group">
              <label className="to-sidebar-radio-label">
                <input
                  type="radio"
                  name="scheduleType"
                  value="auto"
                  checked={scheduleType === "auto"}
                  onChange={() => setScheduleType("auto")}
                />
                <span>Automatic (current time)</span>
              </label>
              <label className="to-sidebar-radio-label">
                <input
                  type="radio"
                  name="scheduleType"
                  value="custom"
                  checked={scheduleType === "custom"}
                  onChange={() => setScheduleType("custom")}
                />
                <span>Set date and time</span>
              </label>
            </div>
            {scheduleType === "custom" && (
              <input
                type="datetime-local"
                className="to-sidebar-input"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            )}
          </div>

          {/* Section 3: Custom Permalink Slug */}
          <div className="to-sidebar-section">
            <div className="to-sidebar-section__title">
              <FiGlobe size={13} color="var(--accent-primary)" />
              <span>Permalink</span>
            </div>
            <div className="to-sidebar-radio-group">
              <label className="to-sidebar-radio-label">
                <input
                  type="radio"
                  name="permalinkType"
                  value="auto"
                  checked={permalinkType === "auto"}
                  onChange={() => setPermalinkType("auto")}
                />
                <span>Automatic permalink</span>
              </label>
              <label className="to-sidebar-radio-label">
                <input
                  type="radio"
                  name="permalinkType"
                  value="custom"
                  checked={permalinkType === "custom"}
                  onChange={() => setPermalinkType("custom")}
                />
                <span>Custom permalink</span>
              </label>
            </div>
            {permalinkType === "custom" && (
              <input
                type="text"
                className="to-sidebar-input"
                placeholder="custom-post-slug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
              />
            )}
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                marginTop: 6,
                wordBreak: "break-all",
              }}
            >
              URL: <span style={{ color: "var(--accent-primary)" }}>/blog/{effectiveSlug}</span>
            </div>
          </div>

          {/* Section 4: Search Description (SEO) */}
          <div className="to-sidebar-section">
            <div className="to-sidebar-section__title">
              <span>Search Description (SEO)</span>
            </div>
            <textarea
              className="to-sidebar-input"
              style={{ height: 80, resize: "none" }}
              maxLength={150}
              placeholder="Brief summary for search results (max 150 characters)..."
              value={searchDescription}
              onChange={(e) => setSearchDescription(e.target.value)}
            />
            <div
              style={{
                fontSize: "0.75rem",
                color: searchDescription.length >= 140 ? "#FCA5A5" : "var(--text-secondary)",
                textAlign: "right",
                marginTop: 4,
              }}
            >
              {searchDescription.length} / 150
            </div>
          </div>

          {/* Section 5: Primary Category */}
          <div className="to-sidebar-section">
            <div className="to-sidebar-section__title">
              <span>Primary Category</span>
            </div>
            <select
              className="to-sidebar-input"
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

          {/* Section 6: Featured Cover Image */}
          <div className="to-sidebar-section" style={{ borderBottom: "none" }}>
            <div className="to-sidebar-section__title">
              <span>Cover Image</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageFileChange}
            />
            {imagePreview ? (
              <div style={{ position: "relative", marginBottom: 10 }}>
                <OptimizedImage
                  src={imagePreview}
                  alt="Cover Preview"
                  variant="preview"
                  style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                    setUploadedImageUrl("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Remove image"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="to-sidebar-input"
                style={{ textAlign: "center", cursor: "pointer", padding: "16px 12px" }}
                onClick={() => fileInputRef.current?.click()}
              >
                + Upload Cover Photo
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="to-preview-modal-backdrop" onClick={() => setShowLinkModal(false)}>
          <div
            className="to-preview-modal"
            style={{ maxWidth: 440 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="to-preview-modal__header">
              <h3 style={{ margin: 0, fontSize: "1rem" }}>Insert / Edit Link</h3>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => setShowLinkModal(false)}
              >
                <FiX size={16} />
              </button>
            </div>
            <form onSubmit={applyLink} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Text to display:
                </label>
                <input
                  type="text"
                  className="to-sidebar-input"
                  placeholder="Link text..."
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Web address (URL):
                </label>
                <input
                  type="url"
                  className="to-sidebar-input"
                  placeholder="https://example.com"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  className="to-toolbar-btn"
                  style={{ width: "auto", padding: "6px 14px" }}
                  onClick={() => setShowLinkModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="to-toolbar-btn"
                  style={{
                    width: "auto",
                    padding: "6px 16px",
                    background: "var(--accent-primary)",
                    color: "#0A0F29",
                    fontWeight: 700,
                  }}
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image URL Modal */}
      {showImageUrlModal && (
        <div className="to-preview-modal-backdrop" onClick={() => setShowImageUrlModal(false)}>
          <div
            className="to-preview-modal"
            style={{ maxWidth: 440 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="to-preview-modal__header">
              <h3 style={{ margin: 0, fontSize: "1rem" }}>Insert Image by URL</h3>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => setShowImageUrlModal(false)}
              >
                <FiX size={16} />
              </button>
            </div>
            <form onSubmit={applyImageUrl} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                  Image Web Address (URL):
                </label>
                <input
                  type="url"
                  className="to-sidebar-input"
                  placeholder="https://images.unsplash.com/..."
                  required
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  className="to-toolbar-btn"
                  style={{ width: "auto", padding: "6px 14px" }}
                  onClick={() => setShowImageUrlModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="to-toolbar-btn"
                  style={{
                    width: "auto",
                    padding: "6px 16px",
                    background: "var(--accent-primary)",
                    color: "#0A0F29",
                    fontWeight: 700,
                  }}
                >
                  Insert Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="to-preview-modal-backdrop" onClick={() => setShowPreview(false)}>
          <div className="to-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="to-preview-modal__header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="to-status-pill to-status-pill--published">Preview Mode</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {effectiveSlug} • {readingTime}
                </span>
              </div>
              <button
                type="button"
                className="to-toolbar-btn"
                onClick={() => setShowPreview(false)}
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="to-preview-modal__body">
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span className="to-sidebar-chip">{category}</span>
                {labels.map((l) => (
                  <span key={l} className="to-sidebar-chip" style={{ borderColor: "rgba(168, 116, 255, 0.3)", color: "var(--accent-secondary)" }}>
                    #{l}
                  </span>
                ))}
              </div>

              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 12 }}>
                {title || "Untitled Article"}
              </h1>

              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 24 }}>
                Published on {formattedPreviewDate} • Estimated reading time: {readingTime}
              </div>

              {imagePreview && (
                <div style={{ marginBottom: 28, borderRadius: 12, overflow: "hidden" }}>
                  <OptimizedImage
                    src={imagePreview}
                    alt={title}
                    variant="preview"
                    style={{ width: "100%", maxHeight: 380, objectFit: "cover" }}
                  />
                </div>
              )}

              {searchDescription && (
                <div
                  style={{
                    padding: "14px 18px",
                    background: "rgba(0, 201, 200, 0.05)",
                    borderLeft: "3px solid var(--accent-primary)",
                    borderRadius: "0 8px 8px 0",
                    marginBottom: 28,
                    fontSize: "0.95rem",
                    color: "#CBD5E1",
                    fontStyle: "italic",
                  }}
                >
                  {searchDescription}
                </div>
              )}

              <div
                className="to-editor-canvas"
                style={{ margin: 0, padding: 0, maxWidth: "100%" }}
                dangerouslySetInnerHTML={{ __html: content || "<p>No content written yet.</p>" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloggerEditor;
