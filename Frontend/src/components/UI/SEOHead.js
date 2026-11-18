import { useEffect } from "react";

const upsertMeta = (attrName, attrValue, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const SEOHead = ({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage,
  jsonLd,
}) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | TechOrcas`
      : "TechOrcas — Intelligent Digital Solutions & Engineering Insights";
    document.title = fullTitle;

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
    }

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:type", ogType);

    const origin = window.location.origin;
    const canonicalUrl = canonicalPath ? `${origin}${canonicalPath}` : window.location.href;

    upsertMeta("property", "og:url", canonicalUrl);
    if (ogImage) {
      upsertMeta("property", "og:image", ogImage.startsWith("http") ? ogImage : `${origin}${ogImage}`);
    }

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    const existingLd = document.getElementById("to-json-ld");
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "to-json-ld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.getElementById("to-json-ld");
      if (ld) ld.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, jsonLd]);

  return null;
};

export default SEOHead;
