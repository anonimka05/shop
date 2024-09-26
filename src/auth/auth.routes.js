const express = require("express");
const authRouter = express.Router();
const { loginSchema } = require("./dtos/login.dto.js");
const authController = require("./auth.controller.js");
const ValidationMiddleware = require("../middleware/validation.middleware.js");

authRouter
  .post("/login", ValidationMiddleware(loginSchema), authController.signin)

  .post(
    "/forgot-password",
    //   ValidationMiddleware(forgotPasswordDto),
    authController.forgotPassword
  )
  .post(
    "/reset-password/:token",
    // ValidationMiddleware(resetPasswordDto),
    authController.restPassword)

module.exports = authRouter;
