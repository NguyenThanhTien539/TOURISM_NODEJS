const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 0, 
    },
  },
  {
    timestamps: true, // ✅ đặt ở đây mới đúng
  }
);

module.exports.ForgotPassword = mongoose.model(
  "ForgotPassword",
  schema,
  "forgot-password"
);
