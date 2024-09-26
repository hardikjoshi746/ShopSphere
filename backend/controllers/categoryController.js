const Category = require("../model/CategoryModel")

const getCategories = async (req, res, next) => {
    try{
        const categories = await Category.find({}).sort({name: "asc"}).orFail() // find all categories and sort them by name in ascending order
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try{
        const {category} = req.body

        if (!category) {
            res.status(400).json({message: "Category not created"}) // if the category is not created
        }

        const categoryExists = await Category.findOne({name: category}) // check if the category already exists

        if (categoryExists) {
            res.status(400).json({message: "Category already exists"}) // if the category already exists

        }else {
        const categoryCreated = await Category.create({ // create a new category
            name: category
        })

        res.status(201).send({categoryCreated: categoryCreated}) // send the new category 
    }

    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    //return res.send(req.params.category)
    try{
        if (req.params.category !== "Choose category") { // if the category is not "Choose category"
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove()
            res.json({categoryDeleted: true}) // send the category deleted
        }

    } catch (error) {
        next(error)
    }
}


module.exports =  {getCategories, newCategory, deleteCategory}