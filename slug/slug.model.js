const mongoose = require("mongoose");
const Joi = require("joi");

const SlugSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    slug: {
      type: String,
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const SlugValidate = Joi.object({
  slug: Joi.string().pattern("(^[a-zA-Z0-9]+$)").required(),
  url: Joi.string().uri().required(),
});

const SlugModel = mongoose.model("Slug", SlugSchema);

module.exports = {
  SlugSchema,
  SlugModel,
  SlugValidate,
};
