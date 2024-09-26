const { isValidObjectId } = require("mongoose");
const OrderItem = require("./order_item.models.js");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../token/create-tokens.js");

class OrderItemController {
  #_orderItemModel;

  constructor() {
    this.#_orderItemModel = OrderItem;
  }

  getAllOrderItems = async (req, res) => {
    try {
      const orders = await this.#_orderItemModel.find(req.body);

      if (!orders) {
        return res.status(404).send({
          message: "Bad request",
        });
      }

      res.status(200).send({
        message: "success",
        resullts: orders.length,
        data: orders,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  getOrderItemByID = async (req, res) => {
    const order_item_id = await this.#_orderItemModel.findOneAndUpdate(
      req.params?.id
    );

    this.#_isValidObjectId(order_item_id);

    res.status(200).send({
      message: "Success",
      data: order_item_id,
    });
  };

  createOrderItem = async (req, res) => {
    try {
      const { product_id, quantity, order_id } = req.body; // Bu yerda to'g'ri 'quantity' ishlatilmoqda

      this.#_isValidObjectId(product_id);
      this.#_isValidObjectId(order_id);

      const newOrderItem = await this.#_orderItemModel.create({
        product_id,
        quantity,
        order_id,
      });

      if (!newOrderItem) {
        return res.status(404).send({
          message: "Order item not created",
        });
      }

      const accessToken = generateAccessToken(newOrderItem);
      const refreshToken = generateRefreshToken(newOrderItem);

      res.status(201).send({
        message: "Order item created successfully",
        data: newOrderItem,
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

  updateOrderItem = async (req, res) => {
    try {
      const order_id = req.params?.id;

      this.#_isValidObjectId(order_id);

      const updateOrderItem = await this.#_orderItemModel.findByIdAndUpdate(
        order_id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateOrderItem) {
        return res.status(404).send({
          message: "Order Item not found",
        });
      }

      const accessToken = generateAccessToken(updateOrderItem);
      const refreshToken = generateRefreshToken(updateOrderItem);

      res.status(200).send({
        message: "Order Item updated successfully",
        data: updateOrderItem,
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

  deleteOrderItem = async (req, res) => {
    const order_id = await this.#_orderItemModel.findOneAndDelete(
      req.params?.id
    );

    this.#_isValidObjectId(order_id);

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

module.exports = new OrderItemController();
