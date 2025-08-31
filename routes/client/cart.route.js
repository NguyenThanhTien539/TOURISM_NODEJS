const route = require("express").Router();
const cartController = require("../../controllers/client/cart.controller");

route.get("/", cartController.cart);

module.exports = route;
