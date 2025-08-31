const route = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller");

route.get("/list", settingController.list);
route.get("/website-info", settingController.websiteInfo);
route.get("/account-admin/list", settingController.accountAdminList);
route.get("/account-admin/create", settingController.accountAdminCreate);
route.get("/role/list", settingController.roleList);
route.get("/role/create", settingController.roleCreate);


module.exports = route;
