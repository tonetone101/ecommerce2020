const User = require('../models/user')
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