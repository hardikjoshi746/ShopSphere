const Product = require("../model/ProductModel")

const getProducts = (req, res) => {
    res.send("Hello from product controller")
}

module.exports =  getProducts 