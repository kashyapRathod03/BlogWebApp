const path = require("path");
const fs = require("fs");
const { cloudinary, isCloudinaryConfigured } = require("../../Config/cloudinary");

const deleteImageFile = (req, deleteImage) => {
  if (!deleteImage || deleteImage === "default.jpg") return;

  if (deleteImage.startsWith("http://") || deleteImage.startsWith("https://")) {
    if (isCloudinaryConfigured()) {
      try {
        const parts = deleteImage.split("/");
        const filename = parts[parts.length - 1].split(".")[0];
        const folder = parts[parts.length - 2];
        const publicId = folder ? `${folder}/${filename}` : filename;
        cloudinary.uploader.destroy(publicId).catch((err) => console.warn("Cloudinary delete warn:", err.message));
      } catch (err) {
        console.warn("Could not parse Cloudinary URL for deletion:", err.message);
      }
    }
    return;
  }

  const rootDir = path.dirname(require.main.filename);
  const filePath = path.join(rootDir, `/public/storyImages/${deleteImage}`);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Local file unlink error:", err.message);
    });
  }
};

module.exports = deleteImageFile;