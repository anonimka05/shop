const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "super-admin"]
      },
      passwordResetToken: {
        type: String
      },
      passwordResetTokenExpireTime:{
        type: Date
      },
      default: "user"
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = model("User", userSchema);

module.exports = User;
