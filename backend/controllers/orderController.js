const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const ObjectId = require("mongoose").Types.ObjectId;

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: ObjectId(req.user._id) }); // get all orders by the user
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id) // get the order by id
      .populate("user", "-password -isAdmin -__v -createdAt -updatedAt") // Correct: Exclude fields properly
      // populate the user data
      .orFail(); // get the order by id
    res.send(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { orderTotal, cartItems, paymentMethod } = req.body;
    if (!orderTotal || !cartItems || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Order data validated successfully");

    const ids = cartItems.map((item) => item.productID);
    const qty = cartItems.map((item) => Number(item.quantity));
    const products = await Product.find({ _id: { $in: ids } });

    if (products.length !== ids.length) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }

    products.forEach((product, index) => {
      product.sales += qty[index];
      product.save();
    });

    const order = new Order({
      user: ObjectId(req.user._id),
      orderTotal,
      cartItems,
      paymentMethod,
    });
    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (error) {
    console.error("Error in createOrder:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail(); // get the order by id
    order.isPaid = true; // set the order to paid
    order.paidAt = Date.now(); // set the paid date

    const updatedOrder = await order.save(); // save the updated order
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail(); // get the order by id
    order.isDelivered = true; // set the order to delivered
    order.deliveredAt = Date.now(); // set the delivered date
    const updatedOrder = await order.save(); // save the updated order
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ paymentMethod: "desc" }); // get all orders and populate the user data
    res.send(orders);
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date); // get the start date from request
    start.setHours(0, 0, 0, 0); // set the hours to 0
    const end = new Date(req.params.date); // get the end date from request
    end.setHours(23, 59, 59, 999); // set the hours to 23

    const orders = await Order.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: "asc" }); // get all orders between the start and end date
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderForAnalysis,
};
