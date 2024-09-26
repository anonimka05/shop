const { Router } = require("express");
const userController = require("../user/user.controller.js");
const createUserDto = require("./dtos/create-user.dtos.js");
const CheckAuthGuard = require("../guards/check-auth.guard.js");
const CheckRolesGuard = require("../guards/check-role.guard.js");
const ValidationMiddleware = require("../middleware/validation.middleware.js");
const updateUserDto = require("./dtos/update-user.dto.js");

const userRouter = Router();

userRouter.post(
  "/add",
  ValidationMiddleware(createUserDto),
  userController.createUser
);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put(
  "/:id",
  ValidationMiddleware(updateUserDto),
  userController.updateUser
);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
