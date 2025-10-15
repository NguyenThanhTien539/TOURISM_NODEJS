const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    email: String,

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

module.exports.Contact = mongoose.model("Contact", schema, "contacts");
