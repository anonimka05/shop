const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number, 
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
  },
  {
    timestamps: true,
    collection: "order-item", 
  }
);

const OrderItem = model("Order_item", orderItemSchema); 

module.exports = OrderItem;
