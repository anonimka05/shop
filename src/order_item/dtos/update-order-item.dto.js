const Joi = require("joi");

 const updateOrderItemDto = Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.string().required(),
  order_id: Joi.string().required(),
});
module.exports = updateOrderItemDto