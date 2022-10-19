const express = require("express");
const { getOrderById, createOrder } = require("../controllers/OrderController");

const router = express.Router();

router.route("/:id").get(getOrderById);
router.route("/").post(createOrder);

module.exports = router;
