const route = require("express").Router();
const orderController = require("../../controllers/admin/order.controller");

route.get("/list", orderController.list);
route.get("/edit", orderController.edit);


module.exports = route;
