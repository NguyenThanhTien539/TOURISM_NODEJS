const route = require("express").Router();
const userController = require("../../controllers/admin/user.controller");

route.get("/list", userController.list);


module.exports = route;
