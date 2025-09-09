const route = require("express").Router();
const accountRoutes = require("./account.route");
const dashboardRoutes = require("./dashboard.route");
const categoryRoutes = require("./category.route");
const tourRoutes = require("./tour.route");
const orderRoutes = require("./order.route");
const userRoutes = require("./user.route");
const contactRoutes = require("./contact.route");
const settingRoutes = require("./setting.route");
const profileRoutes = require("./profile.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

route.use("/account", accountRoutes);
route.use("/dashboard", authMiddleware.verifyToken, dashboardRoutes);
route.use("/category", authMiddleware.verifyToken, categoryRoutes);
route.use("/tour", authMiddleware.verifyToken, tourRoutes);
route.use("/order", authMiddleware.verifyToken, orderRoutes);
route.use("/user", authMiddleware.verifyToken, userRoutes);
route.use("/contact", authMiddleware.verifyToken, contactRoutes);
route.use("/setting", authMiddleware.verifyToken, settingRoutes);
route.use("/profile", authMiddleware.verifyToken, profileRoutes);

route.use(authMiddleware.verifyToken, (req, res) => {
  res.render("admin/pages/error-404", {
    pageTitle: "404 Not Found",
  });
});

module.exports = route;
