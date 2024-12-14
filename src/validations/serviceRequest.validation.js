import Joi from 'joi';
import { RequestStatus, ServiceType } from '@prisma/client';

const employeeOrderSchema = Joi.object({
  employeeName: Joi.string().required(),
  division: Joi.string(),
  items: Joi.array().items(
    Joi.object({
      menuItemId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      notes: Joi.string()
    })
  ).min(1).required()
});

const supervisorSchema = Joi.object({
  name: Joi.string().required(),
  bidang: Joi.string().required(),
  phoneNumber: Joi.string().required()
});

const picSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required()
});

export const serviceRequestValidation = {
  createServiceRequest: Joi.object({
    requestDate: Joi.date().required(),
    requiredDate: Joi.date().required(),
    dropPoint: Joi.string().required(),
    supervisor: supervisorSchema.required(),
    pic: picSchema.required(),
    employeeOrders: Joi.array().items(employeeOrderSchema).min(1).required()
  }),

  updateServiceRequest: Joi.object({
    requestDate: Joi.date(),
    requiredDate: Joi.date(),
    dropPoint: Joi.string(),
    supervisor: supervisorSchema,
    pic: picSchema,
    employeeOrders: Joi.array().items(employeeOrderSchema).min(1)
  }).min(1),

  updateStatus: Joi.object({
    status: Joi.string()
      .valid(...Object.values(RequestStatus))
      .required(),
    notes: Joi.string()
  })
};