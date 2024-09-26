const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
        user_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User"
        },
        price: {
          type: Number,
          required: true,
        },
    order_item_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order_item", 
      },
    ],
  },
  {
    timestamps: true,
    collection: "order",
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
