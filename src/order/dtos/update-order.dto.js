const Joi = require("joi");

const updateOrderDto = Joi.object({
  user_id: Joi.string().required(),
  price: Joi.number().required(),
  order_item_id: Joi.string().required(),
});
module.exports = updateOrderDto