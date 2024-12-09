const joi = require("joi");

const registrationValidation = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.max": "Password must not exceed {#limit} characters."
    })
    .required(),
  email: joi.string().email().required()
});

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.max": "Password must not exceed {#limit} characters."
    })
    .required()
});

module.exports = {
  registrationValidation,
  loginValidation
};
