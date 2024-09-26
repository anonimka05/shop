const Joi = require("joi");

const updatePaymentDto = Joi.object({
  amount_paid: Joi.string().required(),
  payment_date: Joi.string().required(),
  order_id: Joi.string().required(),
});
module.exports = updatePaymentDto