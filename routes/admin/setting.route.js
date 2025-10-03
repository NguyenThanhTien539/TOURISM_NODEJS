const route = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller");
const cloudinaryHelper = require("../../helpers/cloudinary.helper");
const settingValidate = require("../../validates/admin/setting.validate");

const multer = require("multer");
const upload = multer({ storage: cloudinaryHelper.storage });

route.get("/list", settingController.list);

route.get("/website-info", settingController.websiteInfo);

route.patch(
  "/website-info",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  settingController.websiteInfoPatch
);

route.get("/account-admin/list", settingController.accountAdminList);

route.get("/account-admin/create", settingController.accountAdminCreate);

route.post(
  "/account-admin/create",
  upload.single("avatar"),
  settingController.accountAdminCreatePost
);

route.get("/role/list", settingController.roleList);

route.get("/role/create", settingController.roleCreate);

route.post(
  "/role/create",
  settingValidate.roleCreatePost,
  settingController.roleCreatePost
);

route.get("/role/edit/:id", settingController.roleEdit);

route.patch(
  "/role/edit/:id",
  settingValidate.roleCreatePost,
  settingController.roleEditPatch
);

route.patch("/role/delete/:id", settingController.roleDeletePatch);

module.exports = route;
