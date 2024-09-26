const Joi = require("joi");

const updateUserDto = Joi.object({
  first_name: Joi.string().required(),
  phone: Joi.string().min(12).max(12).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = updateUserDto