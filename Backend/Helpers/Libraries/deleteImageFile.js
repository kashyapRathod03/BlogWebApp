const path = require("path");
const fs = require("fs");
const { UPLOAD_DIR } = require("../../Config/upload");

const deleteImageFile = (req, deleteImage) => {
  if (!deleteImage || deleteImage === "default.jpg" || deleteImage === "user.png") return;

  // Extract base filename whether provided as "/uploads/filename.png", "uploads/filename.png", or bare "filename.png"
  const cleanFilename = path.basename(deleteImage);

  // 1. Check in persistent UPLOAD_DIR
  const uploadPath = path.join(UPLOAD_DIR, cleanFilename);
  if (fs.existsSync(uploadPath)) {
    try {
      fs.unlinkSync(uploadPath);
      return;
    } catch (err) {
      console.warn("UPLOAD_DIR unlink error:", err.message);
    }
  }

  // 2. Check in legacy public/storyImages
  const rootDir = path.resolve(__dirname, "../../");
  const storyImgPath = path.join(rootDir, "public/storyImages", cleanFilename);
  if (fs.existsSync(storyImgPath)) {
    try {
      fs.unlinkSync(storyImgPath);
      return;
    } catch (err) {
      console.warn("storyImages unlink error:", err.message);
    }
  }

  // 3. Check in legacy public/userPhotos
  const userPhotoPath = path.join(rootDir, "public/userPhotos", cleanFilename);
  if (fs.existsSync(userPhotoPath)) {
    try {
      fs.unlinkSync(userPhotoPath);
    } catch (err) {
      console.warn("userPhotos unlink error:", err.message);
    }
  }
};

module.exports = deleteImageFile;
