const Category = require("../model/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail(); // find all categories and sort them by name in ascending order
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      res.status(400).json({ message: "Category not created" }); // if the category is not created
    }

    const categoryExists = await Category.findOne({ name: category }); // check if the category already exists

    if (categoryExists) {
      res.status(400).json({ message: "Category already exists" }); // if the category already exists
    } else {
      const categoryCreated = await Category.create({
        // create a new category
        name: category,
      });

      res.status(201).send({ categoryCreated: categoryCreated }); // send the new category
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  //return res.send(req.params.category)
  try {
    if (req.params.category !== "Choose category") {
      // if the category is not "Choose category"
      const categoryExists = await Category.findOne({
        name: decodeURIComponent(req.params.category),
      }).orFail();
      await categoryExists.remove();
      res.json({ categoryDeleted: true }); // send the category deleted
    }
  } catch (error) {
    next(error);
  }
};

const saveAtrr = async (req, res, next) => {
  const { key, value, categoryChosen } = req.body; // get the key, value and category chosen from the request body for the attribute

  if (!key || !value || !categoryChosen) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const category = categoryChosen.split("/")[0]; // split the category chosen into an array and get the first element

    const categoryExists = await Category.findOne({ name: category }).orFail(); // find the category in the database

    if (categoryExists.attr && categoryExists.attr.length > 0) {
      // if the key exists in the database then add the value to the key

      var keyDoesNotExsistInDatabase = true; // assume that the key does not exist in the database

      categoryExists.attr.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExsistInDatabase = false;

          var copyAttributeValues = [...categoryExists.attr[idx].value]; // copy the attribute values to a new array

          copyAttributeValues.push(value); // add the value to the key

          var newAttribute = [...new Set(copyAttributeValues)]; // remove duplicate values from the array

          categoryExists.attr[idx].value = newAttribute; // update the attribute values
        }
      });

      if (keyDoesNotExsistInDatabase) {
        categoryExists.attr.push({ key: key, value: [value] }); // add the key and value to the category
      }
    } else {
      categoryExists.attr.push({ key: key, value: [value] }); // add the key and value to the category
    }
    await categoryExists.save(); // save the category

    let cat = await Category.find({}).sort({ name: "asc" }); // find all categories and sort them by name in ascending order

    res.status(200).json({ categoriesUpdated: cat }); // send the categories
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, newCategory, deleteCategory, saveAtrr };
