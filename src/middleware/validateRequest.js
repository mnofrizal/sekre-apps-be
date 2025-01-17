import { ApiResponse } from "../utils/ApiResponse.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message,
      }));

      return res
        .status(400)
        .json(ApiResponse.error("Validation failed", errors));
    }

    next();
  };
};
