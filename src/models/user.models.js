const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},{
  timestamps: true,
  collection: "users"
});

const User = model("User", userSchema);

module.exports = User;
