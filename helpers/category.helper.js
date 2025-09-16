const buildTree = (categories, parentID = "") => {
  const tree = [];

  categories.forEach((item) => {
    if (item.parent === parentID) {
      const children = buildTree(categories, item.id);

      tree.push({
        id: item.id,
        name: item.name,
        children: children,
      });
    }
  });

  return tree;
};

module.exports.buildTree = buildTree;
