const express = require("express");
const { upload } = require("../Config/upload");
const { cachePrivate } = require("../Middlewares/cache/cacheControl");
const CustomError = require("../Helpers/error/CustomError");

const router = express.Router();

const handleUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new CustomError("File size exceeds 5MB limit", 400));
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

    const fileUrl = `/uploads/${uploadedFile.filename}`;
    return res.status(200).json({
      success: true,
      url: fileUrl,
      filename: uploadedFile.filename,
    });
  });
};

router.post("/", [cachePrivate], handleUpload);
router.post("/image", [cachePrivate], handleUpload);

module.exports = {
  uploadRouter: router,
  handleUpload,
};
