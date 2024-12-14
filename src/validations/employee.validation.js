import Joi from 'joi';

export const employeeValidation = {
  createEmployee: Joi.object({
    nip: Joi.string().required(),
    nama: Joi.string().required(),
    jabatan: Joi.string().required(),
    bagian: Joi.string().required(),
    subBidang: Joi.string().required(),
    email: Joi.string().email().required(),
    nomorHp: Joi.string().required()
  }),
  
  updateEmployee: Joi.object({
    nip: Joi.string(),
    nama: Joi.string(),
    jabatan: Joi.string(),
    bagian: Joi.string(),
    subBidang: Joi.string(),
    email: Joi.string().email(),
    nomorHp: Joi.string()
  }).min(1)
};