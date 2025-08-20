const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Xin chào! Đây là trang chủ");
});

app.listen(port, () => {
  console.log(`The programming is running port ${port}`);
});
