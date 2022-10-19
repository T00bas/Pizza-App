const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const pizzaRouter = require("./routes/PizzaRoutes");
const orderRouter = require("./routes/OrderRoutes");

//dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use("/api/pizzas", pizzaRouter);
app.use("/api/orders", orderRouter);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    //return testOrder.save();
  })
  .catch((err) => {
    console.log("ERROR:", err);
  });

module.exports = app;
