const { Router } = require("express");
const userRouter = require("./user.routes.js");
const productRouter = require("./products.routes.js");
const categoryRouter = require("./category.router.js");
const orderRouter = require("./order.router.js");
const orderItemRouter = require("./order_item.router.js");
const paymentRouter = require("./payment.router.js");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/products", productRouter);
routes.use("/category", categoryRouter);
routes.use("/order", orderRouter);
routes.use("/order-item", orderItemRouter);
routes.use("/payment", paymentRouter)

module.exports = routes;
