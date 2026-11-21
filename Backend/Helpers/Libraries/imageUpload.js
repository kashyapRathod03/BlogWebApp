const { upload, UPLOAD_DIR } = require("../../Config/upload");
const CustomError = require("../error/CustomError");

const handleImageUpload = (fieldName) => {
  const multerMiddleware = upload.single(fieldName);

  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new CustomError("File size exceeds 5MB limit", 400));
        }
        return next(err);
      }
      if (!req.file) return next();

      const publicPath = `/uploads/${req.file.filename}`;
      if (fieldName === "photo") {
        req.savedUserPhoto = publicPath;
      } else {
        req.savedStoryImage = publicPath;
      }

      next();
    });
  };
};

module.exports = {
  single: (fieldName) => handleImageUpload(fieldName),
  upload,
  UPLOAD_DIR,
};
