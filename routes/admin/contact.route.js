const route = require("express").Router();
const contactController = require("../../controllers/admin/contact.controller");

route.get("/list", contactController.list);


module.exports = route;
