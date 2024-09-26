const Joi = require("joi");

const createCategoryDto = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().required(),
});
module.exports = createCategoryDto