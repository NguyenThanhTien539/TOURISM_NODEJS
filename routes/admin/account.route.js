const route = require("express").Router();
const accountController = require("../../controllers/admin/account.controller");
const accountValidate = require("../../validates/admin/account.validate");
const authMiddleware = require("../../middlewares/admin/auth.middleware");


route.get("/login", accountController.login);

route.post("/login",accountValidate.loginPost, accountController.loginPost);

route.post("/logout", accountController.logoutPost);

route.get("/register", accountController.register);

route.get("/register/initial", accountController.registerInitial);

route.post("/register", accountValidate.registerPost, accountController.registerPost);

route.get("/forgot-password", accountController.forgotPassword);

route.post("/forgot-password",accountValidate.forgotPasswordPost, accountController.forgotPasswordPost);

route.get("/otp-password", accountController.otpPassword);

route.post("/otp-password", accountValidate.otpPasswordPost, accountController.otpPasswordPost);

route.get("/reset-password", accountController.resetPassword);

route.post("/reset-password", authMiddleware.verifyToken, accountValidate.resetPasswordPost, accountController.resetPasswordPost);

module.exports = route;
