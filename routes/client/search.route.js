const route = require("express").Router();
const searchController = require("../../controllers/client/search.controller");

route.get("/", searchController.search);

module.exports = route;
