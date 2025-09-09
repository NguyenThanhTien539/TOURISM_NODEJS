const jwt = require("jsonwebtoken");
const { AccountAdmin } = require("../../models/accounts-admin.model");

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

    req.account = existAccount;

    next();
  } catch (error) {
    res.clearCookie(token);
    res.redirect(`/${pathAdmin}/account/login`);
  }
};
