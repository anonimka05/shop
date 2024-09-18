// const { split, query } = require("express");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product.models.js");

class ProductController {
  #_productModel;

  constructor() {
    this.#_productModel = Product;
  }

  getAllProducts = async (req, res) => {
    try {
      // let query = { ...req.query };
      // query = {
      //   ...query,
      //   price: {
      //     $gt: query.price.split("~")[0],
      //     $lt: query.price.split("~")[1],
      //   },
      //   rating: {
      //     $gte: query.price.split("~")[0],
      //     $lte: query.price.split("~")[1],
      //   },
      // };

      // console.log(query);

      // find ichki qismi
      // {
      //   price: {
      //     $gt: query.price.split("~")[0],
      //     $lt: query.price.split("~")[1],
      //   },
      // }

      const allProducts = await this.#_productModel.find(req.body).populate("category_id")

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
      const newProduct = await this.#_productModel.create(req.body);

      if (!newProduct) {
        return res.status(404).send({
          message: "Product not created",
        });
      }

      res.status(201).send({
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const product_id = req.params?.id;

      // Id validatsiyasini tekshirish
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

      res.status(200).send({
        message: "Product updated successfully",
        data: updatedProduct,
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
