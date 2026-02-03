const Joi = require("joi");

// The Bouncer's Checklist
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0), // Price cannot be negative
    image: Joi.object({
      url: Joi.string().allow("", null), // Image can be empty
    }),
  }).required(),
});