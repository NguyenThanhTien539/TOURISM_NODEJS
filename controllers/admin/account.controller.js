const { AccountAdmin } = require("../../models/accounts-admin.model");
const bcrypt = require("bcryptjs");

module.exports.login = (req, res) => {
  res.render("admin/pages/login.pug", {
    pageTitle: "Đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const existAccount = await AccountAdmin.findOne({ email: email });

  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thông",
    });
    return;
  }

  const isPasswordValidate = await bcrypt.compare(
    password,
    existAccount.password
  );

  if (!isPasswordValidate) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng",
    });
    return;
  }

  // if (existAccount.active !== "active") {
  //   res.json({
  //     code: "error",
  //     message: "Tài khoản chưa được kích hoạt",
  //   });
  //   return;
  // }

  res.json({
    code: "success",
    message: "Đăng nhập thành công",
  });
  return;
};

module.exports.register = (req, res) => {
  res.render("admin/pages/register.pug", {
    pageTitle: "Đăng ký",
  });
};
module.exports.registerInitial = (req, res) => {
  res.render("admin/pages/register-initial.pug", {
    pageTitle: "Tài khoản đã được khởi tạo",
  });
};

module.exports.registerPost = async (req, res) => {
  const existAccount = await AccountAdmin.findOne({ email: req.body.email });

  if (existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống",
    });
    return;
  }

  req.body.status = "initial";
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  req.body = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
  };

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công",
  });
};

module.exports.forgotPassword = (req, res) => {
  res.render("admin/pages/forgot-password.pug", {
    pageTitle: "Quên mật khẩu ",
  });
};

module.exports.otpPassword = (req, res) => {
  res.render("admin/pages/otp-password.pug", {
    pageTitle: "Nhập mã OTP",
  });
};

module.exports.resetPassword = (req, res) => {
  res.render("admin/pages/reset-password.pug", {
    pageTitle: "Đổi mật khẩu",
  });
};
