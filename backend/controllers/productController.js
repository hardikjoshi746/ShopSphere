const Product = require("../model/productModel")

const getProducts = (req, res) => {
    Product.create({name: "Macbook", price: 1000})
    res.send("Hello from product controller")
}

module.exports =  getProducts 