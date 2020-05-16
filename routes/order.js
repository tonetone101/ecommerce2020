const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrder } = require("../controllers/order");
const { decreaseQuanity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuanity,
  create
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrder);

router.param("userId", userById);

module.exports = router;
