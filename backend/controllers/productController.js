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
    const searchQuery = req.params.searchQuery || ""; // get the search query from the URL

    //pagination
    const pageNum = Number(req.query.pageNum) || 1; // get the page number from the query string, if not present, default to 1
    // Sort by name, price etc.

    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_"); // split the sort option by underscore
      sort = { [sortOpt[0]]: sortOpt[1] === "1" ? 1 : -1 }; // if sortOpt[1] is 1, sort in ascending order, if 0, sort in descending order
    }

    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      quertyCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } }; // get products that match the search query
      select = { score: { $meta: "textScore" } }; // get the accuracy os the search result
      sort = { score: { $meta: "textScore" } }; // sort the search result by accuracy
    }

    if (quertyCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ], // get products that match all the conditions
      };
    }

    const totalProducts = await Product.countDocuments(query); // get the total number of products
    const products = await Product.find(query)
      .select(select)
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

const getProductsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail(); // get the product by id and populate the reviews
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } }, // sort the products by category and sales in descending order
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      }, // get the product with the highest sales in each category
      { $replaceWith: "$doc_with_max_sales" }, // replace the root with the product with the highest sales in each category
      { $project: { _id: 1, name: 1, image: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]); // get the first 3 products
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ category: 1 })
      .select("name price category"); // get all products and sort by category
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail(); // delete the product by id
    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product(); // create a new product
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item); // add the attributes to the product
      });
    }
    await product.save();

    res.json({
      message: "Product created successfully",
      productId: product._id,
    });
  } catch (error) {
    next(error);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail(); // update the product by id
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item); // add the attributes to the product
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  getBestSellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
};
