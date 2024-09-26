const { Router } = require("express");
const productController = require("./product.controller.js");
const UploadImages = require("../uploads/multer.upload.js");

const productRouter = Router();

productRouter
  .get("/", productController.getAllProducts)
  .post("/add", UploadImages.uploadSingle(), productController.createProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = productRouter;
