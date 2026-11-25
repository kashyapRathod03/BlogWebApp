const { upload } = require("../../Config/upload");
const { uploadToCloudinary } = require("./cloudinaryUpload");
const CustomError = require("../error/CustomError");

const handleImageUpload = (fieldName) => {
  const multerMiddleware = upload.single(fieldName);

  return (req, res, next) => {
    multerMiddleware(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new CustomError("File size exceeds 10MB limit", 400));
        }
        return next(err);
      }
      if (!req.file) return next();

      try {
        const result = await uploadToCloudinary(req.file.buffer);
        const secureUrl = result.secure_url;

        if (fieldName === "photo") {
          req.savedUserPhoto = secureUrl;
        } else {
          req.savedStoryImage = secureUrl;
        }
        req.cloudinaryPublicId = result.public_id;
        next();
      } catch (uploadError) {
        return next(uploadError);
      }
    });
  };
};

module.exports = {
  single: (fieldName) => handleImageUpload(fieldName),
  upload,
};
