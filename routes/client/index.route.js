const route = require("express").Router();
const homeRoute = require("./home.route");
const tourRoute = require("./tour.route")

route.use("/", homeRoute);
route.use("/tours", tourRoute);


module.exports = route;
