const mongoose = require("mongoose");
module.exports.tour_list = mongoose.model(
  "Tour",
  {
    name: String,
    vehicle: String,
  },
  "tour"
);
