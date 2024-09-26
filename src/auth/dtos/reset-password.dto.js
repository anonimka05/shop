const Joi = require("joi");

const resetPasswordDto = Joi.object({
  password: Joi.string().alphanum().min(6).max(20).required(),
});

module.exports = resetPasswordDto;
