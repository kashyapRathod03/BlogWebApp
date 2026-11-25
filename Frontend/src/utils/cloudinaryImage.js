/**
 * Cloudinary Transformation Presets
 * - blur: Tiny LQIP placeholder (~2KB) with heavy blur for instant progressive backdrop
 * - preview: Lightweight medium-res image for cards, feeds, lists, and thumbnails
 * - full: High-resolution crisp image for the main article hero / reader view
 */
export const CLOUDINARY_PRESETS = {
  blur: "w_60,e_blur:800,q_auto:low,f_auto",
  preview: "w_600,c_fill,g_auto,q_auto:low,f_auto",
  full: "w_1400,c_limit,q_auto:best,f_auto",
};

/**
 * Transforms a Cloudinary URL by injecting optimal transformation parameters.
 * Safely passes through non-Cloudinary URLs (legacy /uploads/..., local paths, or external URLs) untouched.
 *
 * @param {string} url The image URL to transform
 * @param {'blur' | 'preview' | 'full'} variant The desired transformation preset
 * @returns {string} The transformed URL or original URL if not Cloudinary
 */
export const getCloudinaryUrl = (url, variant = "preview") => {
  if (!url || typeof url !== "string") return url || "";

  // Pass through non-Cloudinary or non-upload URLs
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const transform = CLOUDINARY_PRESETS[variant] || CLOUDINARY_PRESETS.preview;
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const prefix = url.substring(0, uploadIndex + 8); // includes '/upload/'
  let remainder = url.substring(uploadIndex + 8);

  // If URL already contains transformation segments before version/folder, remove them first
  if (/^[a-z]_[^/]+\//.test(remainder)) {
    remainder = remainder.replace(/^[a-z]_[^/]+\//, "");
  }

  return `${prefix}${transform}/${remainder}`;
};

export default getCloudinaryUrl;
