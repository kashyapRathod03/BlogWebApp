const express = require("express");
const { upload } = require("../Config/upload");
const { uploadToCloudinary } = require("../Helpers/Libraries/cloudinaryUpload");
const { cachePrivate } = require("../Middlewares/cache/cacheControl");
const CustomError = require("../Helpers/error/CustomError");

const router = express.Router();

const handleUpload = (req, res, next) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new CustomError("File size exceeds 10MB limit", 400));
      }
      return next(err);
    }
    const uploadedFile = req.files && req.files.length > 0 ? req.files[0] : req.file;
    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    try {
      const result = await uploadToCloudinary(uploadedFile.buffer);

      return res.status(200).json({
        success: true,
        url: result.secure_url,
        imageUrl: result.secure_url,
        public_id: result.public_id,
        filename: result.original_filename || uploadedFile.originalname,
        format: result.format,
        bytes: result.bytes,
      });
    } catch (uploadError) {
      return next(uploadError);
    }
  });
};

router.post("/", [cachePrivate], handleUpload);
router.post("/image", [cachePrivate], handleUpload);

module.exports = {
  uploadRouter: router,
  handleUpload,
};
