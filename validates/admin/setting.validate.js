const Joi = require("joi");

module.exports.roleCreatePost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập tên tour",
    }),
    description: Joi.string().allow(""),
    permissions: Joi.array().items(Joi.string()).default([]),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.json({
      code: "error",
      message: errorMessage,
    });
  }

  next();
};
