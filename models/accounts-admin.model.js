const mongoose = require("mongoose");
module.exports.AccountAdmin = mongoose.model(
  "AccountAdmin",
  {
    fullName: String,
    email: String,
    password: String,
    status: String,      //initial , active, and inactive 
  },
  "accounts-admin"
);
