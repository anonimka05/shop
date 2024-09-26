const { isValidObjectId } = require("mongoose");
const Product = require("./product.models.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../token/create-tokens.js");

class ProductController {
  #_productModel;

  constructor() {
    this.#_productModel = Product;
  }

  getAllProducts = async (req, res) => {
    try {
      const allProducts = await this.#_productModel
        .find(req.body)
        .populate("category_id");

      if (!allProducts) {
        return res.status(404).send({
          message: "Bad request",
        });
      }

      res.status(200).send({
        message: "success",
        resullts: allProducts.length,
        data: allProducts,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  createProduct = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({
          message: "Iltimos, mahsulot uchun rasm yuklang",
        });
      }

      const productData = {
        ...req.body, 
        imageUrl: req.file.filename,
      };

      const newProduct = await this.#_productModel.create(productData);

      if (!newProduct) {
        return res.status(404).send({
          message: "Mahsulot yaratilmagan",
        });
      }

      const accessToken = generateAccessToken(newProduct);
      const refreshToken = generateRefreshToken(newProduct);

      res.status(201).send({
        message: "Mahsulot muvaffaqiyatli yaratildi",
        data: newProduct,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Ichki server xatosi",
        error: error.message,
      });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const product_id = req.params?.id;

      this.#_isValidObjectId(product_id);

      const updatedProduct = await this.#_productModel.findByIdAndUpdate(
        product_id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).send({
          message: "Product not found",
        });
      }

      const accessToken = generateAccessToken(updatedProduct);
      const refreshToken = generateRefreshToken(updatedProduct);

      res.status(200).send({
        message: "Product updated successfully",
        data: updatedProduct,
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

  deleteProduct = async (req, res) => {
    const product_id = await this.#_productModel.findOneAndDelete(
      req.params?.id
    );

    this.#_isValidObjectId(product_id);

    res.status(200).send({
      message: "succes",
    });
  };

  #_isValidObjectId = (id) => {
    if (!isValidObjectId) {
      throw new Error(`Id: is ${id} is not a valid object`);
    }
  };
}

module.exports = new ProductController();
