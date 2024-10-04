const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getCategories,
  newCategory,
  deleteCategory,
  saveAtrr,
} = require("../controllers/categoryController");

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/", getCategories);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post("/attr", saveAtrr);

module.exports = router;
