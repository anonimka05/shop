const Joi = require("joi")

 const createUserDto = Joi.object({
    first_name: Joi.string().required(),
    phone: Joi.string().min(12).max(12).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),

})
module.exports = createUserDto