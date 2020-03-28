const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/product')
const {errorHandler} = require('../helpers/dbErrorHandlers')

//middleware
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.read = (req, res) => {
    // to not return photo because it could be to big
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req, res) => {
    //using formidable to handle the file uploads
   let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
       if(err) {
           return res.status(400).json({
               error: 'Image could not be uploaded'
           })
       }

       // check for all fields
       const {name, description, price, category, quanity, shipping} = fields

       if (!name || !description || !price || !category || !quanity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            })
       }

       let product = new Product(fields)

       if(files.photo) {
            // 1kb == 1000
            // 1mb = 1000000
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                })
            }

           product.photo.data = fs.readFileSync(files.photo.path)
           product.photo.contentType = files.photo.type
       }

       product.save((err, result) => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
       })
   })
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, result) => {
        if(err) {
            console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
        }
        res.json({
            message: 'Deleted successfully'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
   form.keepExtensions = true
   form.parse(req, (err, fields, files) => {
       if(err) {
           return res.status(400).json({
               error: 'Image could not be uploaded'
           })
       }

       // check for all fields
       const {name, description, price, category, quanity, shipping} = fields

       if (!name || !description || !price || !category || !quanity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            })
       }

       //this is where the update happens
       let product = req.product
       // using lodash .extend method which takes the product and fields as arguments
       product = _.extend(product, fields)

       if(files.photo) {
            // 1kb == 1000
            // 1mb = 1000000
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                })
            }

           product.photo.data = fs.readFileSync(files.photo.path)
           product.photo.contentType = files.photo.type
       }

       product.save((err, result) => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
       })
   })
}


