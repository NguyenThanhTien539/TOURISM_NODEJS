const { Contact } = require("../../models/contact.model");

module.exports.createPost = async (req, res) => {
  const { email } = req.body;

  const existEmail = await Contact.findOne({ email: email });

  if (existEmail) {
    res.json({
      code: "error",
      message: "Email của bạn đã được đăng ký trước đây",
    });
    return;
  }

  const newRecord = new Contact(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Chúc mừng bạn đã đăng ký tài khoản thành công",
  });
};
