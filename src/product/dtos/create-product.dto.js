const Joi = require("joi")

const createProductDto = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    count: Joi.string().required(),
    rating: Joi.number().required(),
    category_id: Joi.string().required()
})

module.exports = createProductDto