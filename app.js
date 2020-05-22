const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

require("dotenv").config();

// database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

//routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", categoryRoutes);
app.use("/", productRoutes);
app.use("/", braintreeRoutes);
app.use("/", orderRoutes);

//if (process.env.NODE_ENV === "production") {
//  app.use(express.static("client/build"));

//  const path = require("path");
//  app.get("*", (req, res) => {
//    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//  });
//}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
