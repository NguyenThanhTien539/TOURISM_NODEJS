const route = require("express").Router();
const contactController = require("../../controllers/client/contact.controller");

route.post("/create", contactController.createPost);

module.exports = route;
