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

route.use("/account", accountRoutes);
route.use("/dashboard", dashboardRoutes);
route.use("/category", categoryRoutes);
route.use("/tour", tourRoutes);
route.use("/order", orderRoutes);
route.use("/user", userRoutes);
route.use("/contact", contactRoutes);
route.use("/setting", settingRoutes);
route.use("/profile", profileRoutes);

route.use((req, res) => {
  res.render("admin/pages/error-404", {
    pageTitle: "404 Not Found",
  });
});

module.exports = route;
