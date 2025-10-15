const jwt = require("jsonwebtoken");
const { AccountAdmin } = require("../../models/accounts-admin.model");
const { Role } = require("../../models/role.model");

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect(`/${pathAdmin}/account/login`);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existAccount = await AccountAdmin.findOne({
      _id: decoded.id,
      email: decoded.email,
      status: "active",
    });

    if (!existAccount) {
      res.clearCookie(token);
      res.redirect(`/${pathAdmin}/account/login`);
      return;
    }

    if (existAccount.role) {
      const detailedRole = await Role.findOne({
        _id: existAccount.role,
        deleted: false,
      });
      if (detailedRole) {
        existAccount.roleName = detailedRole.name;
        res.locals.permissions = detailedRole.permissions;
        req.permissions = detailedRole.permissions;
      }
    }

    req.account = existAccount;

    res.locals.account = existAccount;
    next();
  } catch (error) {
    res.clearCookie(token);
    res.redirect(`/${pathAdmin}/account/login`);
  }
};
