const Order = require("../model/OrderModel");

const getOrders = (req, res) => {
  res.send("Hello from order controller");
};

module.exports = getOrders;
