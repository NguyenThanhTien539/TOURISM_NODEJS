const route = require("express").Router();
const dashboardController = require("../../controllers/admin/dashboard.controller");

route.get("/", dashboardController.dashboard);

module.exports = route;
