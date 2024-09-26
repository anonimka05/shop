const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.models.js");
const createUserDto = require("./dtos/create-user.dtos.js");
const { generateAccessToken, generateRefreshToken } = require("../token/create-tokens.js");

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res) => {
    try {
      console.log(req.user);

      const allUsers = await this.#_userModel.find(req.body);
      console.log(allUsers);

      if (!allUsers || allUsers.length === 0) {
        return res.status(404).send({
          message: "No users found",
        });
      }

      res.status(200).send({
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
      console.log(req.body);

      const { error, value } = createUserDto.validate(req.body);
      if (error) {
        return res.status(400).send({
          message: "Validation error",
          details: error.details,
        });
      }

      const { first_name, phone, email, password } = value;
      console.log(password);

      const existingUser = await this.#_userModel.findOne({
        $or: [{ first_name }, { phone }, { email }],
      });

      if (existingUser) {
        return res.status(400).send({
          message: "User already exists with this first_name, phone, or email.",
        });
      }

      const hashedPass = await bcrypt.hash(password, 7);
      const newUser = await this.#_userModel.create({
        first_name,
        phone,
        email,
        password: hashedPass,
      });

      
      const accessToken = generateAccessToken(this.createUser);
      const refreshToken = generateRefreshToken(this.createUser);

      if (!newUser) {
        return res.status(404).send({
          message: "Error in created user",
        });
      }

      res.status(201).send({
        message: "Successfully created",
        data: {
          user: newUser,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const user_id = req.params?.id;

      this.#_checkObjectId(user_id);

      const existingUser = await this.#_userModel.findById(user_id);
      if (!existingUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const { first_name, phone, email } = req.body;

      const duplicateUser = await this.#_userModel.findOne({
        _id: { $ne: user_id }, 
        $or: [{ first_name }, { phone }, { email }],
      });

      if (duplicateUser) {
        return res.status(400).send({
          message: "User already exists with this first_name, phone, or email.",
        });
      }

      const newUser = await this.#_userModel.findByIdAndUpdate(
        user_id,
        req.body,
        { new: true, runValidators: true }
      );

      
      const accessToken = generateAccessToken(this.updateUser);
      const refreshToken = generateRefreshToken(this.updateUser);

      res.status(200).send({
        message: "Successfully updated",
        data: {
          user: newUser,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).send({
        message: "Internal server error",
        error: error.message,
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
