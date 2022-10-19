const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    unique: true,
    required: [true, "ID is required"],
  },
  order_items: {
    type: Array,
    required: [true, "No items included in the order."],
  },
  total_bill: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
