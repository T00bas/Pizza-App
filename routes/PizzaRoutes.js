const express = require("express");
const { getAllPizzas } = require("../controllers/PizzaController");

const router = express.Router();

router.route("/").get(getAllPizzas);

module.exports = router;
