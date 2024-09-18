const { Router } = require("express");
const productController = require("../controllers/product.controller.js");

const productRouter = Router();

productRouter
  .get("/", productController.getAllProducts)
  .post("/add", productController.createProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = productRouter;
