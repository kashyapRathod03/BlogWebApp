const { cloudinary, isConfigured } = require("../../Config/cloudinary");
const CustomError = require("../error/CustomError");

/**
 * Upload a file buffer to Cloudinary using upload_stream
 * Applies automatic compression and format optimization (auto WebP/AVIF)
 * @param {Buffer} buffer File buffer from multer memoryStorage
 * @param {Object} customOptions Optional overrides for upload options
 * @returns {Promise<Object>} Cloudinary result containing secure_url, public_id, etc.
 */
const uploadToCloudinary = (buffer, customOptions = {}) => {
  return new Promise((resolve, reject) => {
    if (!isConfigured) {
      return reject(
        new CustomError(
          "Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
          500
        )
      );
    }

    const uploadOptions = {
      folder: "techorcas_blog",
      resource_type: "image",
      transformation: [
        { width: 1600, crop: "limit" },
        { quality: "auto:good", fetch_format: "auto" },
      ],
      ...customOptions,
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(
            new CustomError(`Cloudinary upload failed: ${error.message}`, 500)
          );
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

/**
 * Extract Cloudinary public_id from a URL
 * e.g. https://res.cloudinary.com/dtecxhy4m/image/upload/v12345/techorcas_blog/sample.webp -> techorcas_blog/sample
 */
const extractPublicId = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return null;
  if (!imageUrl.includes("cloudinary.com")) return null;

  try {
    const parts = imageUrl.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;

    let publicIdWithExt = parts.slice(uploadIndex + 1).join("/");
    // Strip version tag (e.g. v1700000000/)
    publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, "");

    // Strip any transformation segment before version if present
    if (/^[a-z]_[^/]+\//.test(publicIdWithExt)) {
      publicIdWithExt = publicIdWithExt.replace(/^[a-z]_[^/]+\//, "");
      publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, "");
    }

    // Strip extension
    const lastDotIndex = publicIdWithExt.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return publicIdWithExt.substring(0, lastDotIndex);
    }
    return publicIdWithExt;
  } catch (err) {
    return null;
  }
};

/**
 * Clean up an image from Cloudinary when deleted or replaced
 */
const deleteFromCloudinary = async (imageUrlOrPublicId) => {
  if (!imageUrlOrPublicId || !isConfigured) return;

  const publicId = imageUrlOrPublicId.includes("cloudinary.com")
    ? extractPublicId(imageUrlOrPublicId)
    : imageUrlOrPublicId;

  if (!publicId) return;

  try {
    const res = await cloudinary.uploader.destroy(publicId);
    console.log(`Cloudinary image destroyed: ${publicId} (${res.result})`);
    return res;
  } catch (err) {
    console.warn(`Cloudinary destroy error for ${publicId}:`, err.message);
  }
};

module.exports = {
  uploadToCloudinary,
  extractPublicId,
  deleteFromCloudinary,
};
