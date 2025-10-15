const { AccountAdmin } = require("../../models/accounts-admin.model");
const bcrypt = require("bcryptjs");
module.exports.edit = async (req, res) => {
  res.render("admin/pages/profile-edit.pug", {
    pageTitle: "Thông tin cá nhân",
    detailedProfile: req.account,
  });
};

module.exports.editPatch = async (req, res) => {
  const existAccount = await AccountAdmin.findOne({
    _id: { $ne: req.account.id },
    email: req.body.email,
  });

  console.log(existAccount);

  if (existAccount) {
    res.json({
      code: "error",
      message: "Tài khoản đã tồn tại trong hệ thống",
    });
    return;
  }

  req.body.updatedBy = req.account.id;

  if (req.file) {
    req.body.avatar = req.file.path;
  } else {
    delete req.body.avatar;
  }

  await AccountAdmin.updateOne({ _id: req.account.id }, req.body);

  res.json({
    code: "success",
    message: "Cập nhật thành công",
  });
};

module.exports.changePassword = async (req, res) => {
  res.render("admin/pages/profile-change-password.pug", {
    pageTitle: "Đổi mật khẩu",
  });
};

module.exports.changePasswordPatch = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  await AccountAdmin.updateOne(
    { _id: req.account.id, deleted: false },
    req.body
  );

  res.json({ code: "success", message: "Đã đổi mật khẩu thành công" });
};
