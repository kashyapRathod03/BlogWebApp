import React, { useState, useEffect } from "react";
import { getCloudinaryUrl } from "../../utils/cloudinaryImage";

/**
 * Reusable OptimizedImage Component
 *
 * Implements progressive image loading:
 * 1. Renders micro LQIP blurred placeholder (~2KB) instantly for Cloudinary URLs.
 * 2. Preloads and transitions to target preset (preview or full) with smooth fade-in.
 * 3. Gracefully supports non-Cloudinary images with standard lazy/eager loading.
 *
 * @param {Object} props
 * @param {string} props.src Image URL
 * @param {string} [props.alt=""] Image alternative text
 * @param {'preview' | 'full'} [props.variant="preview"] Transformation preset
 * @param {string} [props.className=""] Additional CSS classes
 * @param {Object} [props.style={}] Inline styles
 * @param {'lazy' | 'eager'} [props.loading] Loading strategy
 * @param {'high' | 'low' | 'auto'} [props.fetchpriority] Fetch priority
 * @param {Function} [props.onError] Error callback
 */
const OptimizedImage = ({
  src,
  alt = "",
  variant = "preview",
  className = "",
  style = {},
  loading,
  fetchpriority,
  onError,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackSrc = "/storyImages/default.jpg";
  const activeSrc = hasError || !src ? fallbackSrc : src;
  const isCloudinary =
    typeof activeSrc === "string" &&
    activeSrc.includes("res.cloudinary.com") &&
    activeSrc.includes("/upload/");

  const blurUrl = isCloudinary ? getCloudinaryUrl(activeSrc, "blur") : null;
  const targetUrl = isCloudinary ? getCloudinaryUrl(activeSrc, variant) : activeSrc;

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src, variant]);

  const defaultLoading = loading || (variant === "full" ? "eager" : "lazy");
  const defaultFetchPriority = fetchpriority || (variant === "full" ? "high" : "auto");

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      if (onError) onError(e);
    }
  };

  return (
    <div
      className={`to-optimized-img-wrapper ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "block",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {/* 1. Micro-LQIP Blurred Placeholder */}
      {blurUrl && !isLoaded && (
        <img
          src={blurUrl}
          alt={alt}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: style.objectFit || "cover",
            filter: "blur(20px)",
            transform: "scale(1.05)",
            opacity: 0.9,
            transition: "opacity 0.4s ease-out",
          }}
        />
      )}

      {/* 2. Target Transformed Image (Preview or Full) */}
      <img
        src={targetUrl}
        alt={alt}
        loading={defaultLoading}
        fetchpriority={defaultFetchPriority}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        style={{
          width: "100%",
          height: "100%",
          objectFit: style.objectFit || "cover",
          display: "block",
          opacity: isLoaded || !blurUrl ? 1 : 0,
          transition: "opacity 0.35s ease-in-out",
        }}
        {...rest}
      />
    </div>
  );
};

export default OptimizedImage;
