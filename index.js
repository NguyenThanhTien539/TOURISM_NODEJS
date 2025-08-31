const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
const databaseConfig = require("./config/database.config");
const path = require("path");
const clientRoutes = require("./routes/client/index.route");
const adminRoutes = require("./routes/admin/index.route");
const variableConfig = require("./config/variable.config");
databaseConfig.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.locals.pathAdmin = variableConfig.pathAdmin;

app.use(`/${variableConfig.pathAdmin}`, adminRoutes);
app.use("/", clientRoutes);

app.listen(port, () => {
  console.log(`The programming is running at port ${port}`);
});
