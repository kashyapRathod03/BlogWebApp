const path = require("path");
const fs = require("fs");
const multer = require("multer");
const CustomError = require("../Helpers/error/CustomError");

// 1. Resolve & Auto-Create Directory for Hostinger Managed Node.js and local dev
const UPLOAD_DIR = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, "..", "uploads");

try {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
} catch (err) {
  console.error("Failed to create UPLOAD_DIR:", err);
}

// Ensure default assets exist in UPLOAD_DIR if available
const defaultAssetSource = path.join(__dirname, "../public/storyImages/default.jpg");
const defaultAssetDest = path.join(UPLOAD_DIR, "default.jpg");
if (fs.existsSync(defaultAssetSource) && !fs.existsSync(defaultAssetDest)) {
  try {
    fs.copyFileSync(defaultAssetSource, defaultAssetDest);
  } catch (err) {
    // Non-fatal
  }
}

// 2. Multer Disk Storage with collision-safe, sanitized filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext);
    const sanitizedBase = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeFilename = `${uniqueSuffix}-${sanitizedBase || "image"}${ext}`;
    cb(null, safeFilename);
  },
});

// MIME-type validation for JPEG, PNG, GIF, WebP
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

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = {
  UPLOAD_DIR,
  upload,
  storage,
  fileFilter,
};
