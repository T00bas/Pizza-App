const orderService = require("../services/OrderService");

exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const order = await orderService.getOrder({ order_id: id });
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    const newId = orders[orders.length - 1].order_id + 1;
    const newOrder = Object.assign({ order_id: newId }, req.body);
    const order = await orderService.createOrder(newOrder);
    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
