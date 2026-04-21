const Joi = require("joi");

const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required()
            .messages({
                'string.empty': 'Email is required',
                'any.required': 'Email is required',
                'string.email': 'Enter a valid email'
            }),
        password: Joi.string()
            .required()
            .messages({
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            })
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    next();
}

module.exports = loginValidator;