const route = require("express").Router();
const homeRoute = require("./home.route");
const tourRoute = require("./tour.route")
const cartRoute = require("./cart.route")

route.use("/", homeRoute);
route.use("/tours", tourRoute);
route.use("/cart", cartRoute);


module.exports = route;
