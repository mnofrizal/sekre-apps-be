import Joi from "joi";
import { RequestStatus, ServiceType } from "@prisma/client";

const employeeOrderSchema = Joi.object({
  employeeName: Joi.string().required(),
  entity: Joi.string(),
  items: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        notes: Joi.string(),
      })
    )
    .min(1)
    .required(),
});

const supervisorSchema = Joi.object({
  name: Joi.string().required(),
  subBidang: Joi.string().required(),
  nomorHp: Joi.string().required(),
});

const picSchema = Joi.object({
  name: Joi.string().required(),
  nomorHp: Joi.string().required(),
});

export const serviceRequestValidation = {
  createServiceRequest: Joi.object({
    judulPekerjaan: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(ServiceType))
      .required(),
    requestDate: Joi.date().iso().invalid("").required().messages({
      "string.empty": "Request date cannot be empty",
      "date.base": "Request date must be a valid ISO date string",
    }),
    requiredDate: Joi.date().iso().invalid("").required().messages({
      "string.empty": "Required date cannot be empty",
      "date.base": "Required date must be a valid ISO date string",
    }),
    dropPoint: Joi.string().required(),
    supervisor: supervisorSchema.required(),
    pic: picSchema.required(),
    employeeOrders: Joi.array().items(employeeOrderSchema).min(1).required(),
  }),

  updateServiceRequest: Joi.object({
    judulPekerjaan: Joi.string(),
    requestDate: Joi.date(),
    requiredDate: Joi.date(),
    dropPoint: Joi.string(),
    supervisor: supervisorSchema,
    pic: picSchema,
    employeeOrders: Joi.array().items(employeeOrderSchema).min(1),
  }).min(1),

  updateStatus: Joi.object({
    status: Joi.string()
      .valid(...Object.values(RequestStatus))
      .required(),
    notes: Joi.string(),
  }),
};
