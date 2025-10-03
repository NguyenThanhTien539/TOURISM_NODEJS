const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    permissions: Array,
    createdBy: String,
    updatedBy: String,

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

module.exports.Role = mongoose.model("Role", schema, "roles");
