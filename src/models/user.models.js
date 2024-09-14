const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: String,
  phone: String,
  email: String
});

const User = model("User", userSchema);

module.exports = User;
