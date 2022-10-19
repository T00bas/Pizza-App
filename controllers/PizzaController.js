const pizzaService = require("../services/PizzaService");

exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await pizzaService.getAllPizzas();
    res.status(200).json({
      status: "success",
      results: pizzas.length,
      data: {
        pizzas,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
