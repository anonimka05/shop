// const { Schema, model } = require("mongoose");

// const orderItemSchema = new Schema(
//   {
//     product_id: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "Product"
//     },
//     quantity: {
//       type: String,
//       required: true,
//     },
//     order_id: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "Order"
//     },
//   },
//   {
//     timestamps: true,
//     collection: "order-item",
//   }
// );

// const OrderItem = model("Orde_item", orderItemSchema);

// module.exports = OrderItem;


const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number, // Use Number for quantity instead of String
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
    collection: "order-item", // Use plural name for collection consistency
  }
);

const OrderItem = model("Order_item", orderItemSchema); // Fixed model name

module.exports = OrderItem;
