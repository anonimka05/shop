const { Router } = require("express");
const categoryController = require("../category/category.controller.js");

const categoryRouter = Router();

categoryRouter
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getCategoryById)
  .post("/add", categoryController.createCategory)
  .put("/:id", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
