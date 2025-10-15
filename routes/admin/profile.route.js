const route = require("express").Router();
const profileController = require("../../controllers/admin/profile.controller");

const cloudinaryHelper = require("../../helpers/cloudinary.helper");

const multer = require("multer");
const upload = multer({ storage: cloudinaryHelper.storage });

route.get("/edit", profileController.edit);

route.patch("/edit", upload.single("avatar"), profileController.editPatch);

route.get("/change-password", profileController.changePassword);

route.patch("/change-password", profileController.changePasswordPatch);

module.exports = route;


