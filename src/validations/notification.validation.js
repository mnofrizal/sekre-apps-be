import Joi from "joi";

export const notificationValidation = {
  sendToUsers: Joi.object({
    userIds: Joi.array().items(Joi.string()).min(1).required(),
    notification: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
      data: Joi.object().default({}),
    }).required(),
  }),

  sendToTokens: Joi.object({
    tokens: Joi.array().items(Joi.string()).min(1).required(),
    notification: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
      data: Joi.object().default({}),
    }).required(),
  }),

  sendToRole: Joi.object({
    role: Joi.string().valid("ADMIN", "SECRETARY", "KITCHEN").required(),
    notification: Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
      data: Joi.object().default({}),
    }).required(),
  }),
};
