import Joi from "joi";

export const pushTokenValidation = {
  createPushToken: Joi.object({
    token: Joi.string().required(),
    device: Joi.string(),
    isActive: Joi.boolean(),
  }),

  updatePushToken: Joi.object({
    token: Joi.string(),
    device: Joi.string(),
    isActive: Joi.boolean(),
  }).min(1),
};
