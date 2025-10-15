const { Category } = require("../models/category.model");

const buildTree = (categories, parentID = "") => {
  const tree = [];

  categories.forEach((item) => {
    if (item.parent === parentID) {
      const children = buildTree(categories, item.id);

      tree.push({
        id: item.id,
        name: item.name,
        children: children,
        slug: item.slug,
      });
    }
  });

  return tree;
};

module.exports.buildTree = buildTree;

const getCategoryChild = async (parentID) => {
  const res = [];

  const categoryList = await Category.find({
    deleted: "false",
    status: "active",
    parent: parentID,
  });

  for (const item of categoryList) {
    res.push({ id: item.id, name: item.name, slug: item.slug });
    const child = await getCategoryChild(item.id);
    res.push(...child);
  }

  return res;
};

module.exports.getCategoryChild = getCategoryChild;
