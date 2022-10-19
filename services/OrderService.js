const OrderModel = require("../models/Order");

exports.getOrder = async (id) => {
  return await OrderModel.findOne({ order_id: id });
};

exports.createOrder = async (order) => {
  return await OrderModel.create(order);
};

exports.getAllOrders = async () => {
  return await OrderModel.find();
};
