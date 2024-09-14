const {Router} = require("express")
const userController = require("../controllers/user.controller.js")

const userRouter = Router()

userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/add", userController.createUser)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter
