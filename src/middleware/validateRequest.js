import { ApiResponse } from "../utils/ApiResponse.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    console.log("Incoming request body:", req.body);
    console.log("Request headers:", req.headers);
    console.log("Content-Type:", req.headers["content-type"]);

    const { error } = schema.validate(req.body, {
      abortEarly: false,
      debug: true,
    });

    if (error) {
      console.log("Validation error:", error.details);
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
