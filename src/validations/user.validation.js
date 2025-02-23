import Joi from "joi";
import { DashboardRole } from "@prisma/client";

export const userValidation = {
  createUser: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.values(DashboardRole))
      .required(),
    avatar: Joi.string(),
    isActive: Joi.boolean(),
    phone: Joi.string().allow(null, ""),
  }),

  updateUser: Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).allow(""),
    name: Joi.string(),
    role: Joi.string().valid(...Object.values(DashboardRole)),
    avatar: Joi.string(),
    isActive: Joi.boolean(),
    phone: Joi.string().allow(null, ""),
  }).min(1),
};
