const { Router } = require("express");
const userRouter = require("../user/user.routes.js");
const productRouter = require("../product/products.routes.js");
const categoryRouter = require("../category/category.routes.js");
const orderRouter = require("../order/order.routes.js");
const orderItemRouter = require("../order_item/order_item.routes.js");
const paymentRouter = require("../payment/payment.routes.js");
const authRouter = require("../auth/auth.routes.js");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/products", productRouter);
routes.use("/category", categoryRouter);
routes.use("/order", orderRouter);
routes.use("/order-item", orderItemRouter);
routes.use("/payment", paymentRouter)
routes.use("/auth", authRouter)

module.exports = routes;
