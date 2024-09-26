const Joi = require("joi");

const createPaymentDto = Joi.object({
  amount_paid: Joi.string().required(),
  payment_date: Joi.string().required(),
  order_id: Joi.string().required(),
});
module.exports = createPaymentDto