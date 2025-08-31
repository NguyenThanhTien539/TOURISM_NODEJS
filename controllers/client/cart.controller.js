module.exports.cart = (req, res) => {
  res.render("client/page/cart.pug", {
    pageTitle: "Giỏ hàng",
  });
};
