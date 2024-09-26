const { Router } = require("express");
const paymentController = require("./payment.controller.js");

const paymentRouter = Router();

paymentRouter
  .get("/", paymentController.getAllPayment)
  .get("/:id", paymentController.getPaymentById)
  .post("/add", paymentController.createPayment)
  .put("/:id", paymentController.updatePayment)
  .delete("/:id", paymentController.deletePayment);

module.exports = paymentRouter;
