const categoryHelper = require("../../helpers/category.helper");
const { Category } = require("../../models/category.model");

module.exports.list = async (req, res, next) => {
  const categoryList = await Category.find({
    deleted: false,
    status: "active",
  });

  const categoryTree = categoryHelper.buildTree(categoryList, "");
  res.locals.categoryTree = categoryTree;

  next();
};
