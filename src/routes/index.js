const { Router } = require("express");
const userRouter = require("./user.routes.js");

const routes = Router();

routes.use("/users", userRouter);

module.exports = routes;
