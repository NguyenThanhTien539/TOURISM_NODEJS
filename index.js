const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const clientRoute = require("./routes/client/index.route");

mongoose.connect(process.env.DATABASE);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use("/", clientRoute);

app.listen(port, () => {
  console.log(`The programming is running port ${port}`);
});
