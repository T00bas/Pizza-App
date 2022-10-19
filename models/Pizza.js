const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pizza name missing."],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide price."],
  },
  ingredients: Array,
});

module.exports = mongoose.model("Pizza", pizzaSchema);
