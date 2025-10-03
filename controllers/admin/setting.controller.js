const { WebsiteInfo } = require("../../models/setting-website-info.model");
const { permissionList, pathAdmin } = require("../../config/variable.config");
const { Role } = require("../../models/role.model");
const { AccountAdmin } = require("../../models/accounts-admin.model");
const bcrypt = require("bcryptjs");

module.exports.list = (req, res) => {
  res.render("admin/pages/setting-list.pug", {
    pageTitle: "Cài đặt chung",
  });
};

module.exports.websiteInfo = async (req, res) => {
  const settingWebsiteInfo = await WebsiteInfo.findOne({});
  res.render("admin/pages/setting-website-info.pug", {
    pageTitle: "Thông tin website",
    settingWebsiteInfo: settingWebsiteInfo,
  });
};

module.exports.websiteInfoPatch = async (req, res) => {
  console.log(req.files);
  if (req.files && req.files.logo) {
    req.body.logo = req.files.logo[0].path;
  }

  if (req.files && req.files.favicon) {
    req.body.favicon = req.files.favicon[0].path;
  }

  const totalRecord = await WebsiteInfo.findOne({});
  if (!totalRecord) {
    const newRecord = new WebsiteInfo(req.body);
    await newRecord.save();
  } else {
    await WebsiteInfo.updateOne({ _id: totalRecord.id }, req.body);
  }

  res.json({
    code: "success",
    message: "Cập nhật thành công",
  });
};

module.exports.accountAdminList = (req, res) => {
  res.render("admin/pages/setting-account-admin-list.pug", {
    pageTitle: "Tài khoản quản trị",
  });
};

module.exports.accountAdminCreate = async (req, res) => {
  const roleList = await Role.find({ deleted: false });

  res.render("admin/pages/setting-account-admin-create.pug", {
    pageTitle: "Tạo tài khoản quản trị",
    roleList: roleList,
  });
};

module.exports.accountAdminCreatePost = async (req, res) => {
  const existAccount = await AccountAdmin.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existAccount) {
    res.json({
      code: "error",
      message: "Tài khoản đã tồn tại",
    });
    return;
  }

  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;
  req.avatar = req.file ? req.file.path : "";

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  console.log(req.body);
  // const newRecord = new AccountAdmin(req.body);
  // await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo thành công",
  });
};

module.exports.roleList = async (req, res) => {
  const roleList = await Role.find({ deleted: false });

  res.render("admin/pages/setting-role-list.pug", {
    pageTitle: "Nhóm quyền",
    roleList: roleList,
  });
};

module.exports.roleCreate = async (req, res) => {
  res.render("admin/pages/setting-role-create.pug", {
    pageTitle: "Tạo nhóm quyền",
    permissionList: permissionList,
  });
};

module.exports.roleCreatePost = async (req, res) => {
  try {
    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;

    const newRecord = new Role(req.body);
    await newRecord.save();

    res.json({
      code: "success",
      message: "Đã tạo thành công",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Lỗi dữ liệu",
    });
  }
};

module.exports.roleEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id, deleted: false });
    if (!role) {
      res.redirect(`/${pathAdmin}/setting/role/list`);
    }

    res.render("admin/pages/setting-role-edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền nhóm quyền",
      permissionList: permissionList,
      role: role,
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/setting/role/list`);
  }
};

module.exports.roleEditPatch = async (req, res) => {
  try {
    const { id } = req.params;

    const existRecord = await Role.findOne({ _id: id, deleted: false });
    if (!existRecord) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ",
      });
    }
    req.body.updatedBy = req.account.id;
    await Role.updateOne({ _id: id, deleted: false }, req.body);
    res.json({
      code: "success",
      message: "Chỉnh sửa thành công",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ",
    });
  }
};

module.exports.roleDeletePatch = async (req, res) => {
  try {
    const { id } = req.params;

    const existRecord = await Role.findOne({ _id: id, deleted: false });
    if (!existRecord) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ",
      });
    }

    await Role.updateOne(
      { _id: id },
      { deleted: true, deletedBy: req.account.id, deletedAt: Date.now() }
    );

    res.json({
      code: "success",
      message: "Xóa thành công",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ",
    });
  }
};
