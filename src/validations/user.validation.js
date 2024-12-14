import Joi from 'joi';
import { DashboardRole } from '@prisma/client';

export const userValidation = {
  createUser: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    role: Joi.string().valid(...Object.values(DashboardRole)).required(),
    isActive: Joi.boolean()
  }),
  
  updateUser: Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string(),
    role: Joi.string().valid(...Object.values(DashboardRole)),
    isActive: Joi.boolean()
  }).min(1)
};