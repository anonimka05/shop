const Joi = require("joi");

const loginSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().required(),
});

module.exports = {loginSchema};
