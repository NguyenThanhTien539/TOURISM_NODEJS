module.exports.home = (req, res) => {
  res.render("client/page/home.pug", {
    pageTitle: "Trang chủ",
  });
};
