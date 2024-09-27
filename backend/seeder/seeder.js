const connectDB = require("../config/db");

connectDB();

const categoryData = require("./categories");
const productData = require("./products");
const reviewData = require("./reviews");
const userData = require("./users");
const orderData = require("./orders");

const Category = require("../model/CategoryModel");
const Product = require("../model/ProductModel");
const Review = require("../model/ReviewModel");
const User = require("../model/UserModel");
const Order = require("../model/OrderModel");
const importData = async () => {
  try {
    //await Category.collection.dropIndex()
    // await Product.collection.dropIndex()

    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Category.insertMany(categoryData);
    const reviews = await Review.insertMany(reviewData);
    const sampleProducts = productData.map((product) => {
      reviews.map((review) => {
        product.reviews.push(review._id);
      });
      return { ...product };
    });
    await Product.insertMany(sampleProducts);
    await User.insertMany(userData);
    await Order.insertMany(orderData);

    console.log("Category data imported");
    process.exit();
  } catch (error) {
    console.log("Error in importing data", error);
    process.exit(1);
  }
};

importData();
