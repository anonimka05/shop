const { isValidObjectId } = require("mongoose");
const Order = require("../models/oreder.models");

class OrderController {
  #_orderModel;

  constructor() {
    this.#_orderModel = Order;
  }

  getAllOrders = async (req, res) => {
    try {
      const orders = await this.#_orderModel.find(req.body);

      if (!orders) {
        return res.status(404).send({
          message: "Bad request",
        });
      }

      res.status(200).send({
        message: "success",
        resullts: orders.length,
        data: orders,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  // getOrderById = async (req, res) => {
  //   try {
  //     const order = await Order.findById(req.params.id).populate("order_item");

  //     if (!order) {
  //       return res.status(404).send({ message: "Order not found" });
  //     }

  //     res.status(200).send({
  //       message: "Order found",
  //       data: order,
  //     });
  //   } catch (error) {
  //     return res.status(500).send({
  //       message: "Internal server error",
  //       error: error.message,
  //     });
  //   }
  // };

   getOrderById = async (req, res) => {
    try {
      // Populate order_items instead of order_item
      const order = await Order.findById(req.params.id).populate("order_items");

      if (!order) {
        return res.status(404).send({ message: "Buyurtma topilmadi" });
      }

      res.status(200).send({
        message: "Buyurtma topildi",
        data: order,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Ichki server xatosi",
        error: error.message,
      });
    }
  };

  createOrder = async (req, res) => {
    try {
      //   const newOrder = await this.#_orderModel.create(req.body);

      const { order_item_id, user_id, price } = req.body;

      const newOrder = await Order.create({
        order_item_id, // order_item_id larni massivda qabul qiladi
        user_id,
        price,
      });

      if (!newOrder) {
        return res.status(404).send({
          message: "Order not created",
        });
      }

      res.status(201).send({
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  updateOrder = async (req, res) => {
    try {
      const order_id = req.params?.id;

      this.#_isValidObjectId(order_id);

      const updateOrder = await this.#_orderModel.findByIdAndUpdate(
        order_id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateOrder) {
        return res.status(400).send({
          message: "Bad request",
        });
      }

      res.status(200).send({
        message: "Order updated successfully",
        data: updateOrder,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  deleteOrder = async (req, res) => {
    const order_id = await this.#_orderModel.findOneAndDelete(req.params?.id);

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

module.exports = new OrderController();
