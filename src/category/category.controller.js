const { isValidObjectId } = require("mongoose");
const Category = require("./category.models.js");
const { generateAccessToken, generateRefreshToken } = require("../token/create-tokens.js");

class CategoryController {
  #_categoryController;

  constructor() {
    this.#_categoryController = Category;
  }

  getAllCategories = async (req, res) => {
    try {
      const category = await this.#_categoryController.find();

      if (!category) {
        return res.status(404).send({
          message: "category not found",
        });
      }

      res.status(200).send({
        message: "success",
        data: category,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  getCategoryById = async (req, res) => {
    const category_id = await this.#_categoryController.findById(
      req.params?.id
    );

    this.#_isValidObjectId(category_id);

    res.status(200).send({
      message: "success",
      data: category_id,
    });
  };

  createCategory = async (req, res) => {
    try {
      const category = await this.#_categoryController.create(req.body);

      if (!category) {
        return res.status(400).status({
          message: "Category not found",
        });
      }

      const accessToken = generateAccessToken(category);
      const refreshToken = generateRefreshToken(category);

      res.status(201).send({
        message: "success",
        data: category,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const category_id = req.params?.id;

      this.#_isValidObjectId(category_id);

      const updatedCategory = await this.#_categoryController.findByIdAndUpdate(
        category_id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).send({
          message: "Category not found",
        });
      }

      const accessToken = generateAccessToken(updatedCategory);
      const refreshToken = generateRefreshToken(updatedCategory);

      res.status(200).send({
        message: "Category updated successfully",
        data: updatedCategory,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  deleteCategory = async (req, res) => {
    const category_id = await this.#_categoryController.findByIdAndDelete(
      req.params?.id
    );

    this.#_isValidObjectId(category_id);

    res.status(201).send({
      message: "Success deleted category",
    });
  };

  #_isValidObjectId = (id) => {
    if (!isValidObjectId) {
      throw new Error(`Id: is ${id} is not a valid object`);
    }
  };
}
module.exports = new CategoryController();
