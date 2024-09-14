const { error } = require("console");
const User = require("../models/user.models.js");

class UserController {
  constructor() {}

  async getAllUsers(req, res) {
    try {
      const allUsers = await User.find();

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
  }

  async getUserById(req, res) {
    try {
      const user = await User.findOne();

      if (!user) {
        return res.status(404).send({
          message: "User not found",
          error: error.message,
        });
      }
      res.status(200).send({
        message: "success",
        data: user,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Bad request",
        error: error.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const { first_name, phone, email } = await User.create(req.body);

      const newUser = {
        first_name,
        phone,
        email,
      };

      if (!newUser) {
        return res.status(404).send({
          message: "Datas not found",
          error: error.message,
        });
      }
      res.status(201).send({
        message: "successfully created",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { first_name, phone, email } = await User.findOneAndUpdate(
        req.body
      );
      const user_id = await User.findOne(req.params?.id);

      if (!user_id) {
        return res.status(404).send({
          message: "User id not found",
        });
      }
      const newUser = {
        first_name,
        phone,
        email,
      };

      if (!newUser) {
        return res.status(404).send({
          message: "User not found",
          error: error.message,
        });
      }

      console.log(newUser);

      res.status(201).send({
        message: "success",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(req.params?.id);

      if (!user) {
        return res.status({
          message: "User id not found",
        });
      }
      res.status(201).send({
        message: "deleted successfully",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Bad request",
      });
    }
  }
}
module.exports = new UserController();
