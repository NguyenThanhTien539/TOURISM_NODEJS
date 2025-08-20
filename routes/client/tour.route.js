const route = require("express").Router();
const tourController = require("../../controllers/tour.controller");

route.get("/", tourController.tour_list);

module.exports = route;
