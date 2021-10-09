const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const GetUserValidation = Joi.object({
  userId: Joi.objectId(),
  email: Joi.string().email(),
  username: Joi.string().pattern(new RegExp("(^[a-zA-Z0-9_]+$)")).min(2).max(20),
}).min(1);

const ChangePasswordValidation = Joi.object({
  newPassword: Joi.string().required(),
  changePasswordToken: Joi.string().required(),
});

const ForgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  GetUserValidation,
  ChangePasswordValidation,
  ForgotPasswordValidation,
};
