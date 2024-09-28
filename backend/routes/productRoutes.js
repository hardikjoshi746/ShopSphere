const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsById,
  getBestSellers,
} = require("../controllers/productController");

router.get("category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/:id", getProductsById);

module.exports = router;
