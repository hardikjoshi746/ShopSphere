const mongoose = require("mongoose");
const User = require("./UserModel");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  orderTotal: {
    itemCount: { type: Number, required: true, default: 0 },
    cartSubtotal: { type: Number, required: true },
  },
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { path: { type: String, required: true } },
      quantity: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },
  trasectionResult: {
    status: { type: String },
    createTime: { type: String },
    amount: { type: Number },
  },
  isPaid: { type: Boolean, default: false, required: true },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false, required: true },
  deliveredAt: { type: Date },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
