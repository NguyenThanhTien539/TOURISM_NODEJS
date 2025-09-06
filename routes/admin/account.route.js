const route = require("express").Router();
const accountController = require("../../controllers/admin/account.controller");
const accountValidate = require("../../validates/admin/account.validate");


route.get("/login", accountController.login);

route.post("/login", accountController.loginPost);

route.get("/register", accountController.register);

route.get("/register/initial", accountController.registerInitial);

route.post("/register", accountValidate.registerPost, accountController.registerPost);

route.get("/forgot-password", accountController.forgotPassword);

route.get("/otp-password", accountController.otpPassword);

route.get("/reset-password", accountController.resetPassword);

module.exports = route;
