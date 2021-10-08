const Joi = require("joi");
const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /(^[a-zA-Z0-9_]+$)/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN", "MODERATOR"],
    },
    slugs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Slug",
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuthValidateSchema = Joi.object({
  username: Joi.string().pattern(new RegExp("(^[a-zA-Z0-9_]+$)")).min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

const AuthModel = mongoose.model("Auth", AuthSchema);

module.exports = {
  AuthSchema,
  AuthModel,
  AuthValidateSchema,
};
