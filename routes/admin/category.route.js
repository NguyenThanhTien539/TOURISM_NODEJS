const route = require("express").Router();
const categoryController = require("../../controllers/admin/category.controller");
const cloudinaryHelper = require("../../helpers/cloudinary.helper");
const categoryValidate = require("../../validates/admin/category.validate");

const multer = require("multer");
const upload = multer({ storage: cloudinaryHelper.storage });

route.get("/list", categoryController.list);

route.get("/create", categoryController.create);

route.get("/edit/:id", categoryController.edit);

route.patch(
  "/edit/:id",
  upload.single("avatar"),
  categoryValidate.createPost,
  categoryController.editPatch
);

route.patch("/delete/:id", categoryController.deletePatch);

route.patch("/change-multi", categoryController.changeMultiPatch);

route.post(
  "/create",
  upload.single("avatar"),
  categoryValidate.createPost,
  categoryController.createPost
);

module.exports = route;
