const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    amount_paid: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId, 
      ref: "Order", 
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "payments",
  }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
