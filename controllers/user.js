const User = require('../models/user')

exports.signup = (req, res) => {
    console.log('req.body', req.body)
    // create new user
    const user = new User(req.body)
    // save user to database
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json({
            user
        })
    })
}