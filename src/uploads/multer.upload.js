const multer = require("multer");
const path = require("path");

class UploadImages {
  constructor() {
    this.storageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "images")); 
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}--${file.originalname}`;
        cb(null, uniqueSuffix); 
      },
    });

    this.upload = multer({
      storage: this.storageEngine,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );

        if (mimeType && extName) {
          return cb(null, true); 
        } else {
          cb(
            new Error(
              "Iltimos, faqat rasm fayllarini yuklang (jpeg, jpg, png)."
            )
          );
        }
      },
    });
  }

  uploadSingle() {
    return this.upload.single("image");
  }

  uploadMultiple(count) {
    return this.upload.array("images", count); 
  }
}

module.exports = new UploadImages();
