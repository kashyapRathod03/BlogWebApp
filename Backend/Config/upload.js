const path = require("path");
const multer = require("multer");
const CustomError = require("../Helpers/error/CustomError");

// 1. In-Memory Storage for Cloudinary streaming (zero disk writes on Hostinger)
const storage = multer.memoryStorage();

// 2. MIME-type validation for JPEG, PNG, GIF, WebP
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    return cb(
      new CustomError(
        "Please provide a valid image file (JPEG, PNG, GIF, WebP)",
        400
      ),
      false
    );
  }
  cb(null, true);
};

// 3. Multer Instance (10MB limit)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Legacy UPLOAD_DIR path preserved for graceful read-only fallback if old files exist
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, "..", "uploads");

module.exports = {
  upload,
  storage,
  fileFilter,
  UPLOAD_DIR,
};
