const { Router } = require("express");
const orderItemController = require("./order_item.controller.js");

const orderItemRouter = Router();

orderItemRouter
  .get("/", orderItemController.getAllOrderItems)
  .get("/:id", orderItemController.getOrderItemByID)
  .post("/add", orderItemController.createOrderItem)
  .put("/:id", orderItemController.updateOrderItem)
  .delete("/:id", orderItemController.deleteOrderItem);

module.exports = orderItemRouter;
