const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandlers')
const _ = require('lodash')

//middleware
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            }) 
        }
        req.category = category
        next()
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    console.log(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res) => {
       //this is where the update happens
       const category = req.category
       category.name = req.body.name
       //save the changes to DB
       category.save((err, result) => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
       })
}

exports.remove = (req, res) => {
    let category = req.category
    category.remove((err, result) => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "delete successful"
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}


