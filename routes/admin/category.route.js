const route = require("express").Router();
const categoryController = require("../../controllers/admin/category.controller");
const cloudinaryHelper = require("../../helpers/cloudinary.helper");

const multer = require("multer");
const upload = multer({ storage: cloudinaryHelper.storage });

route.get("/list", categoryController.list);

route.get("/create", categoryController.create);

route.post("/create", upload.single("avatar"), categoryController.createPost);

module.exports = route;
