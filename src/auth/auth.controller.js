const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const User = require("../user/user.models.js");
const sendEmail = require("../utils/send-email.utils.js");
const bcryptConfig = require("../config/bcrypt.config.js");
const { ConflictExeption } = require("../exeption/conflic.exception.js");

config();
class AuthControlller {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  //! LOGIN
  signin = async (req, res) => {
    const { first_name, password } = req.body;
    const user = await this.#_userModel.findOne({ first_name });
    const check_pass = await bcrypt.compare(password, user.password);
    if (!check_pass) {
      return res.status(400).send({ message: "Invalid  password" });
    }
    if (!user) {
      return res.status(400).send({ message: "Invalid username" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.first_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    res.status(200).send({ message: "Successfully signed in", accessToken });
  };

  restPassword = async (req, res, next) => {
    try {
      const { password } = req.body;
      const { token } = req.params?.token;
      const foundedUser = await this.#_userModel.findOne({
        passwordResetToken: token,
      });

      if (foundedUser.passwordResetTokenExpireToken - Date.now() < 0) {
        throw new ConflictExeption("Password reset time already expired");
      }

      const hashedPass = await bcrypt.hash(password, bcryptConfig.rounds);

      await this.#_userModel.findByIdAndUpdate(foundedUser.id, {
        password: hashedPass,
        passwordResetToken: null,
        passwordResetTokenExpireToken: null,
      });

      res.send({
        message: "success",
      });
      // res.redirect("/");
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await this.#_userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const resetToken = await crypto.randomBytes(32).toString("hex");
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/reset-password/${resetToken}`;
      const options = {
        from: process.env.FROM_MAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>To reset your password, please click on the following link:</p>
                   <a href="${resetUrl}">Reset Password</a>`,
      };
      await sendEmail(options);
      const newPassword = await this.#_userModel.findByIdAndUpdate(user._id, {
        passwordResetToken: resetToken,
        passwordResetTokenExpireTime: Date.now() + 3600000,
      });
      return res.status(200).send({
        message: "Password reset link sent to your email",
        password: newPassword,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new AuthControlller();
