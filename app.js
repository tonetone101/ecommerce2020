const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

// database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}).then(() => console.log('DB connected'))

// import routes
const userRoutes = require('./routes/user')

//routes
app.use('/', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})