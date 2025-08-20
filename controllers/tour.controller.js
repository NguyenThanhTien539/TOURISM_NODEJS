const tourModel = require("../models/tour.model");

module.exports.tour_list = async (req, res) => {
  const tourList = await tourModel.tour_list.find({});
  res.render("client/page/tour-list.pug", {
    pageTitle: "Tour list",
    tourList: tourList,
  });
};
