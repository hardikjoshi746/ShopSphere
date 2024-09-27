const Product = require("../model/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
  try {
    const pageNum = Number(req.query.pageNum) || 1; // get the page number from the query string, if not present, default to 1
    const totalProducts = await Product.countDocuments({});
    // Sort by name, price etc.

    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_"); // split the sort option by underscore
      sort = { [sortOpt[0]]: sortOpt[1] === "1" ? 1 : -1 }; // if sortOpt[1] is 1, sort in ascending order, if 0, sort in descending order
      console.log(sort);
    }

    const products = await Product.find({})
      .skip(recordsPerPage * (pageNum - 1)) // skip the first 2 products
      .sort(sort)
      .limit(recordsPerPage); // get the first 2 products

    res.json({
      products,
      pageNum,
      paginationLinkNumber: Math.ceil(totalProducts / recordsPerPage),
    }); // paginationLinkNumber is the total number of pages
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
