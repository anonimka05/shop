const { Router } = require("express");
const orderController = require("../controllers/order.controller.js");

const orderRouter = Router();

orderRouter
  .get("/", orderController.getAllOrders)
  .get("/:id", orderController.getOrderById)
  .post("/add", orderController.createOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

module.exports = orderRouter;
