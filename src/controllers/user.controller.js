const { isValidObjectId } = require("mongoose");
const User = require("../models/user.models.js");

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res) => {
    try {
      const allUsers = await this.#_userModel.find(req.body);

      if (!allUsers) {
        return res.status(404).send({
          message: "Bad request",
          error: error.message,
        });
      }

      res.status(201).send({
        message: "success",
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };

  getUserById = async (req, res) => {
    try {
      const user_id = await this.#_userModel.findById(req.params?.id);

      this.#_checkObjectId(user_id);

      res.status(200).send({
        message: "success",
        data: user_id,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Bad request",
        error: error.message,
      });
    }
  };

  createUser = async (req, res) => {
    try {
      const { first_name, phone, email } = await this.#_userModel.create(
        req.body
      );

      const newUser = {
        first_name,
        phone,
        email,
      };
      console.log(newUser);

      if (!newUser) {
        return res.status(404).send({
          message: "Error in created user",
          error: error.message,
        });
      }
      res.status(201).send({
        message: "successfully created",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Error in server",
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user_id = req.params?.id;
      const newUser = await this.#_userModel.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true, runValidators: true }
      );

      this.#_checkObjectId(user_id);

      if (!newUser) {
        return res.status(404).send({
          message: "User not found",
          error: error.message,
        });
      }

      res.status(201).send({
        message: "success",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const user_id = await this.#_userModel.findOneAndDelete(req.params?.id);

      this.#_checkObjectId(user_id);

      res.status(201).send({
        message: "deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Bad request",
      });
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId) {
      throw new Error(`Id: ${id} is not a valid object`);
    }
    return null;
  };
}
module.exports = new UserController();
