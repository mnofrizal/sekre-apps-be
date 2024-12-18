import Joi from "joi";
import { ApprovalType } from "@prisma/client";

export const approvalValidation = {
  create: Joi.object({
    type: Joi.string()
      .valid(...Object.values(ApprovalType))
      .required(),
    expiresIn: Joi.number().integer().min(1).max(168).default(24), // Max 1 week in hours
  }),

  respond: Joi.object({
    response: Joi.boolean().required(),
    responseNote: Joi.string().max(500),
  }),
};
