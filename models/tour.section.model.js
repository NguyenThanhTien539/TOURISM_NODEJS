const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    tourSection4: String,
    tourSection6: String,
  },
  {
    timestamps: true,
  }
);

module.exports.TourSections = mongoose.model("TourSections", schema, "tour-sections");
