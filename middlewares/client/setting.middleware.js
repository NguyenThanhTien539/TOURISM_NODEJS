const { WebsiteInfo } = require("../../models/setting-website-info.model");

module.exports.websiteInfo = async (req, res, next) => {
  const websiteInfo = await WebsiteInfo.findOne({});
  res.locals.websiteInfo = websiteInfo;
  next();
};
