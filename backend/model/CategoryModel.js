const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
        default: "default category description"
        },

    image: {
        type: String,
        default: "/images/default/tablets-category.png"
    },

    atrs: [{key: {type: String}, value: [{type: String}]}]
    
})

categorySchema.index({description: 1}) // sort the description in ascending order for faster search

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
