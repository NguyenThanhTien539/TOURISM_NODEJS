const route = require("express").Router();
const tourController = require("../../controllers/admin/tour.controller");

route.get("/list", tourController.list);
route.get("/trash", tourController.trash);
route.get("/create", tourController.create);

module.exports = route;
