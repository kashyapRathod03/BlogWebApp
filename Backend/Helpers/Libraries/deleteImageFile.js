const path = require("path");
const fs = require("fs");
const { deleteFromCloudinary } = require("./cloudinaryUpload");
const { UPLOAD_DIR } = require("../../Config/upload");

const deleteImageFile = (req, deleteImage) => {
  const targetImage = deleteImage || req?.savedStoryImage || req?.body?.image;
  if (!targetImage || targetImage === "default.jpg" || targetImage === "user.png") return;

  // 1. Cloudinary URL or public_id cleanup
  if (typeof targetImage === "string" && targetImage.includes("cloudinary.com")) {
    deleteFromCloudinary(targetImage).catch((err) => {
      console.warn("Cloudinary delete notice:", err.message);
    });
    return;
  }

  // 2. Legacy local disk fallback if file exists in persistent UPLOAD_DIR
  const cleanFilename = path.basename(targetImage);

  if (UPLOAD_DIR) {
    const uploadPath = path.join(UPLOAD_DIR, cleanFilename);
    if (fs.existsSync(uploadPath)) {
      try {
        fs.unlinkSync(uploadPath);
        return;
      } catch (err) {
        console.warn("UPLOAD_DIR unlink error:", err.message);
      }
    }
  }

  // 3. Legacy public/storyImages directory
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

  // 4. Legacy public/userPhotos directory
  const userPhotoPath = path.join(rootDir, "public/userPhotos", cleanFilename);
  if (fs.existsSync(userPhotoPath)) {
    try {
      fs.unlinkSync(userPhotoPath);
      return;
    } catch (err) {
      console.warn("userPhotos unlink error:", err.message);
    }
  }
};

module.exports = deleteImageFile;
