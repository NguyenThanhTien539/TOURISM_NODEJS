const route = require("express").Router();
const categoryController = require("../../controllers/client/category.controller");
route.get("/:slug", categoryController.list);

module.exports = route;
