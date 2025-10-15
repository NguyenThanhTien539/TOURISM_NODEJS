const slugify = require("slugify");
const { City } = require("../../models/cities.model");
const { Tour } = require("../../models/tour.model");
const moment = require("moment");
module.exports.search = async (req, res) => {
  try {
    // Danh sách thành phố
    const destinationList = await City.find({}).sort({
      name: "asc",
    });
    // Hết Danh sách thành phố

    const find = {
      status: "active",
      deleted: false,
    };

    // Điểm đi
    if (req.query.locationFrom) {
      find.locations = req.query.locationFrom;
    }
    // Hết Điểm đi

    // Ngày khởi hành
    if (req.query.departureDate) {
      const departureDate = new Date(req.query.departureDate);
      find.departureDate = departureDate;
    }
    // Hết Ngày khởi hành

    // Điểm đến
    if (req.query.locationTo) {
      const locationTo = slugify(req.query.locationTo);
      const locationToRegex = new RegExp(locationTo, "i");
      find.slug = locationToRegex;
    }
    // Hết Điểm đến

    // Số lượng hành khách
    // Người lớn
    if (req.query.stockAdult) {
      find.stockAdult = {
        $gte: parseInt(req.query.stockAdult),
      };
    }

    // Trẻ em
    if (req.query.stockChildren) {
      find.stockChildren = {
        $gte: parseInt(req.query.stockChildren),
      };
    }

    // Em bé
    if (req.query.stockBaby) {
      find.stockBaby = {
        $gte: parseInt(req.query.stockBaby),
      };
    }
    // Hết Số lượng hành khách

    // Khoảng giá
    if (req.query.price) {
      const [priceMin, priceMax] = req.query.price
        .split("-")
        .map((item) => parseInt(item));
      find.priceNewAdult = {
        $gte: priceMin,
        $lte: priceMax,
      };
    }
    // Hết Khoảng giá

    const filterTourList = await Tour.find(find).sort({
      position: "desc",
    });

    for (const item of filterTourList  ) {
      item.discount = Math.floor(
        ((item.priceAdult - item.priceNewAdult) / item.priceAdult) * 100
      );
      if (item.departureDate) {
        item.departureDateFormat = moment(item.departureDate).format(
          "DD/MM/YYYY"
        );
      }
    }

    res.render("client/page/search", {
      pageTitle: "Kết quả tìm kiếm",
      destinationList: destinationList,
      filterTourList: filterTourList,
    });
  } catch (error) {
    res.redirect("/");
  }
};
