const Joi = require('joi');

const joiUserSchema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(100).required(),
    lastName: Joi.string().alphanum().min(2).max(100).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
});

const joiBookSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    isbn: Joi.number()
        .positive()
        .integer()
        .greater(100000000)
        .less(9999999999999)
        .required(),
    author: Joi.string().alphanum().min(2).max(100).required(),
});

module.exports = { joiUserSchema, joiBookSchema };
