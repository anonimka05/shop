const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

const Category = model("Category", categorySchema);

module.exports = Category;
