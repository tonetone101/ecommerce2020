const express = require('express')
const router = express.Router()

const {create, productById, photo, listSearch, listBySearch, listCategories, read, remove, update, list, listRelated} = require('../controllers/product') 
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth') 
const {userById} = require('../controllers/user') 

router.get('/product/:productId', read)
router.get('/products', list)
router.get("/products/search", listSearch);
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.post("/products/by/search", listBySearch);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove )
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update )

// middleware to fetch photo
router.get('/product/photo/:productId', photo)

router.param('productId', productById)
router.param('userId', userById)

module.exports = router