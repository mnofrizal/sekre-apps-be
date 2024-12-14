import Joi from 'joi';
import { MenuCategory } from '@prisma/client';

export const menuValidation = {
  createMenuItem: Joi.object({
    name: Joi.string().required(),
    category: Joi.string()
      .valid(...Object.values(MenuCategory))
      .required(),
    isAvailable: Joi.boolean()
  }),
  
  updateMenuItem: Joi.object({
    name: Joi.string(),
    category: Joi.string().valid(...Object.values(MenuCategory)),
    isAvailable: Joi.boolean()
  }).min(1)
};