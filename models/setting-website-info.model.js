const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  websiteName: String,
  phone: String,
  email: String,
  address: String,
  logo: String,
  favicon: String,
});

module.exports.WebsiteInfo = mongoose.model(
  "WebsiteInfo",
  schema,
  "website-info"
);
