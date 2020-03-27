const User = require('../models/user')
const jwt = require('jsonwebtoken') // used to generate signed token
const expressJwt = require('express-jwt') // used to check authorization
const {errorHandler} = require('../helpers/dbErrorHandlers')

exports.signup = (req, res) => {
    console.log('req.body', req.body)
    // create new user
    const user = new User(req.body)
    // save user to database
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        // to not return salt and hashed password data after user is created
        user.salt = undefined
        user.hashed_password = undefined

        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    // find user based on email
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User with that email doesnt exist, Please signup'
            })
        }
        // if user is found, make sure email and password matches
        // create auth method in user model
        if(!user.authenticate(password)) {
            return res.staus(401).json({
                error: 'email and password dont match'
            })
        }
        // generate a signed token with userId and JWT SECRET
        // will use jwt.sign to create sign token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({
        message: 'Sign out successful'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }

    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admins only! Access denied'
        })
    }
    

    next()
}