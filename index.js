const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);

const Tour = mongoose.model(
  "Tour",
  {
    name: String,
    vehicle: String,
  },
  "tour"
);

app.get("/", async (req, res) => {
  res.send("Xin chào! Đây là trang chủ");
  const tourList = await Tour.find({});
  console.log(tourList);
});

app.listen(port, () => {
  console.log(`The programming is running port ${port}`);
});
