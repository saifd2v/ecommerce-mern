const Joi = require("joi");

const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(15)
            .required()
            .pattern(/^[a-zA-Z0-9_]{3,20}$/)
            .messages({
                "string.empty": "Username is required",
                "string.min": "Username must be at least 3 characters",
                "string.max": "Username must be at most 10 characters",
                "any.required": "Username is required",
                'string.pattern.base': 'Username must be 3–20 characters long and contain only letters, numbers, and underscores',
            }),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.email': 'Enter a valid email'
            }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase letters, and a number',
            })
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
    next();
}

module.exports = registerValidator;