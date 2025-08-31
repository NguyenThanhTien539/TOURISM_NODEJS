const route = require("express").Router();
const accountController = require("../../controllers/admin/account.controller");

route.get("/login", accountController.login);
route.get("/register", accountController.register);
route.get("/forgot-password", accountController.forgotPassword);
route.get("/otp-password", accountController.otpPassword);
route.get("/reset-password", accountController.resetPassword);

module.exports = route;
