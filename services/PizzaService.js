const PizzaModel = require("../models/Pizza");

exports.getAllPizzas = async () => {
  return await PizzaModel.find();
};
