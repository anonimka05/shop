const Joi = require("joi");

const updateCategoryDto = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().required(),
});
module.exports = updateCategoryDto