const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    name: String,
    category: String,
    position: Number,
    status: String,
    avatar: String,
    priceAdult: Number,
    priceChildren: Number,
    priceBaby: Number,
    priceNewAdult: Number,
    priceNewChildren: Number,
    priceNewBaby: Number,
    stockAdult: Number,
    stockChildren: Number,
    stockBaby: Number,
    locations: Array,
    time: String,
    vehicle: String,
    departureDate: Date,
    information: String,
    schedules: Array,
    createdBy: String,
    updatedBy: String,
    slug: {
      type: String,
      slug: "name",
      unique: true,
      slugPaddingSize: 4,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: String,
    deletedAt: Date,
  },
  {
    timestamps: true, // ✅ đặt ở đây mới đúng
  }
);

module.exports.Tour = mongoose.model("Tour", schema, "tours");

