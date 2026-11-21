export const stripHtml = (html = "") => {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
};

export const getArticleExcerpt = (story, maxLength = 135) => {
  if (!story) return "";
  const raw = story.excerpt && story.excerpt.trim() ? story.excerpt.trim() : stripHtml(story.content);
  if (raw.length <= maxLength) return raw;
  return `${raw.slice(0, maxLength).trim()}...`;
};

export const formatArticleDate = (dateValue) => {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getReadingTimeLabel = (story) => {
  if (!story) return "1 min read";
  const words = stripHtml(story.content).split(/\s+/).filter(Boolean).length;
  const computed = Math.max(1, Math.ceil(words / 200));
  const minutes = story.readtime && story.readtime > 0 ? story.readtime : computed;
  return `${minutes} min read`;
};

export const buildSlugId = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const parseContentWithToc = (html = "") => {
  if (!html || typeof window === "undefined") {
    return { processedHtml: html, headings: [] };
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headingEls = doc.body.querySelectorAll("h1, h2, h3");
  const headings = [];
  const usedIds = new Map();

  headingEls.forEach((el, index) => {
    const text = (el.textContent || "").trim();
    if (!text) return;
    let id = buildSlugId(text) || `section-${index + 1}`;
    const count = usedIds.get(id) || 0;
    usedIds.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count + 1}`;
    }
    el.setAttribute("id", id);
    headings.push({
      id,
      text,
      level: Number(el.tagName.replace("H", "")),
    });
  });

  return {
    processedHtml: doc.body.innerHTML,
    headings,
  };
};

export const getApiBase = () => {
  if (typeof window === "undefined") return "";
  if (import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }
  if (
    window.location &&
    window.location.hostname === "localhost" &&
    window.location.port === "5173"
  ) {
    return "http://localhost:5000";
  }
  return "";
};

export const getImageUrl = (image, fallback = "/storyImages/default.jpg") => {
  if (!image) return fallback;
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const base = getApiBase();

  if (image.startsWith("/uploads/")) {
    return `${base}${image}`;
  }
  if (image.startsWith("uploads/")) {
    return `${base}/${image}`;
  }
  if (image.startsWith("/storyImages/")) {
    return `${base}${image}`;
  }
  if (image.startsWith("storyImages/")) {
    return `${base}/${image}`;
  }
  if (image.startsWith("image_") || image === "default.jpg") {
    return `${base}/storyImages/${image}`;
  }

  return `${base}/uploads/${image}`;
};

export const getUserPhotoUrl = (photo, fallback = "/userPhotos/user.png") => {
  if (!photo) return fallback;
  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://") ||
    photo.startsWith("data:") ||
    photo.startsWith("blob:")
  ) {
    return photo;
  }

  const base = getApiBase();

  if (photo.startsWith("/uploads/")) {
    return `${base}${photo}`;
  }
  if (photo.startsWith("uploads/")) {
    return `${base}/${photo}`;
  }
  if (photo.startsWith("/userPhotos/")) {
    return `${base}${photo}`;
  }
  if (photo.startsWith("userPhotos/")) {
    return `${base}/${photo}`;
  }

  return `${base}/userPhotos/${photo}`;
};

