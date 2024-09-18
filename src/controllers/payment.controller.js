const { isValidObjectId } = require("mongoose");
const Payment = require("../models/payment.models.js");

class PaymentController {
  #_paymentModel;

  constructor() {
    this.#_paymentModel = Payment;
  }

  getAllPayment = async (req, res) => {
    try {
      const payment = await this.#_paymentModel.find(req.body);

      if (!payment) {
        return res.status(404).send({
          message: "Bad request",
        });
      }

      res.status(200).send({
        message: "success",
        resullts: payment.length,
        data: payment,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Interval server error",
      });
    }
  };

  getPaymentById = async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id).populate("order_id"); 

      if (!payment) {
        return res.status(404).send({ message: "Payment not found" });
      }

      res.status(200).send({
        message: "Payment found",
        data: payment,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  createPayment = async (req, res) => {
    try {
      const { amount_paid, payment_date, order_id } = req.body;

      const newPayment = await Payment.create({
        amount_paid,
        payment_date,
        order_id,
      });

      if (!newPayment) {
        return res.status(400).send({
          message: "Payment not found",
        });
      }

      res.status(201).send({
        message: "Successfully created payment",
        data: newPayment,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Ichki server xatosi",
        error: error.message,
      });
    }
  };

  updatePayment = async (req, res) => {
    try {
      const order_id = req.params?.id;

      this.#_isValidObjectId(order_id);

      const updateOrder = await this.#_paymentModel.findByIdAndUpdate(
        order_id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateOrder) {
        return res.status(404).send({
          message: "Order Item not found",
        });
      }

      res.status(200).send({
        message: "Order Item updated successfully",
        data: updateOrder,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  deletePayment = async (req, res) => {
    const order_id = await this.#_paymentModel.findOneAndDelete(req.params?.id);

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

module.exports = new PaymentController();
