const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CustomError = require("../error/CustomError");
const { cloudinary, isCloudinaryConfigured } = require("../../Config/cloudinary");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError("Please provide a valid image file (JPEG, PNG, GIF, WebP)", 400), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadToCloudinary = (buffer, folder = "publishhub") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const handleImageUpload = (fieldName) => {
  const multerMiddleware = upload.single(fieldName);

  return (req, res, next) => {
    multerMiddleware(req, res, async (err) => {
      if (err) return next(err);
      if (!req.file) return next();

      try {
        if (isCloudinaryConfigured()) {
          // Cloudinary Permanent Storage
          const result = await uploadToCloudinary(req.file.buffer, "publishhub");
          if (fieldName === "photo") {
            req.savedUserPhoto = result.secure_url;
          } else {
            req.savedStoryImage = result.secure_url;
          }
          return next();
        }

        // Local Disk Storage Fallback
        const rootDir = path.resolve(__dirname, "../../");
        const isPhoto = fieldName === "photo";
        const destFolder = isPhoto
          ? path.join(rootDir, "public/userPhotos")
          : path.join(rootDir, "public/storyImages");

        if (!fs.existsSync(destFolder)) {
          fs.mkdirSync(destFolder, { recursive: true });
        }

        const ext = req.file.mimetype.split("/")[1] || "png";
        let fileName;
        if (isPhoto) {
          fileName = `photo_user_${req.user?.id || Date.now()}.${ext}`;
          req.savedUserPhoto = fileName;
        } else {
          fileName = `image_${new Date().toISOString().replace(/:/g, "-")}_${req.file.originalname}`;
          req.savedStoryImage = fileName;
        }

        const filePath = path.join(destFolder, fileName);
        fs.writeFileSync(filePath, req.file.buffer);
        next();
      } catch (uploadError) {
        return next(new CustomError(`Image upload failed: ${uploadError.message}`, 500));
      }
    });
  };
};

module.exports = {
  single: (fieldName) => handleImageUpload(fieldName),
};
