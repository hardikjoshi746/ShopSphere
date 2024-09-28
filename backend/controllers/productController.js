const Product = require("../model/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let quertyCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      quertyCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } }; // get products with price less than or equal to the price in the query string
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      quertyCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }; // get products with rating in the query string
    }

    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || ""; // get the category name from the URL
    if (categoryName) {
      quertyCondition = true;
      let a = categoryName.replaceAll(",", "/"); // replace all commas with slashes
      var regEx = new RegExp("^" + a); // create a regular expression to match the category name
      categoryQueryCondition = { category: regEx }; // get products with category name that starts with the category name in the URL
    }

    if (req.query.category) {
      quertyCondition = true;
      let a = req.query.category.split(",").map((item) => {
        // split the category query string by comma and create an array
        if (item) return new RegExp("^" + item); // create a regular expression to match the category name
      });
      categoryQueryCondition = {
        category: { $in: a }, // get products with category name that starts with the category name in the query string
      };
    }

    let attrsQueryCondition = [];
    if (req.query.attrs) {
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-"); // split the attribute query string by hyphen
          let values = [...a]; // create a copy of the array
          values.shift(); // remove the first element
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } }, // get products with attribute name and value in the query string
          };
          acc.push(a1); // add the attribute query to the accumulator
          return acc; // return the accumulator
        } else return acc;
      }, []);
      quertyCondition = true;
    }

    if (quertyCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          ...attrsQueryCondition,
        ], // get products that match all the conditions
      };
    }
    //pagination
    const pageNum = Number(req.query.pageNum) || 1; // get the page number from the query string, if not present, default to 1
    // Sort by name, price etc.

    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_"); // split the sort option by underscore
      sort = { [sortOpt[0]]: sortOpt[1] === "1" ? 1 : -1 }; // if sortOpt[1] is 1, sort in ascending order, if 0, sort in descending order
      console.log(sort);
    }

    const totalProducts = await Product.countDocuments(query); // get the total number of products
    const products = await Product.find(query)
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
