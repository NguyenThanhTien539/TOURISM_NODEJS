const route = require("express").Router();
const tourController = require("../../controllers/client/tour.controller");

route.get("/", tourController.tour_list);
route.get("/detail", tourController.tour_detail );

module.exports = route;
