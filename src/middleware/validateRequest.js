import { ApiResponse } from "../utils/ApiResponse.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      console.log("=== Validation Middleware Start ===");
      console.log("Raw request body:", req.rawBody?.toString());

      // Try parsing raw body ourselves
      let parsedBody;
      try {
        parsedBody = req.rawBody ? JSON.parse(req.rawBody.toString()) : null;
        console.log("Manually parsed body:", parsedBody);
      } catch (e) {
        console.log("Failed to parse raw body:", e.message);
      }

      console.log("Express parsed body:", req.body);
      console.log("Request headers:", req.headers);
      console.log("Content-Type:", req.headers["content-type"]);

      // Check date fields specifically
      if (req.body.requestDate) {
        console.log("requestDate value:", req.body.requestDate);
        console.log("requestDate type:", typeof req.body.requestDate);
        console.log("requestDate parsed:", new Date(req.body.requestDate));
      }
      if (req.body.requiredDate) {
        console.log("requiredDate value:", req.body.requiredDate);
        console.log("requiredDate type:", typeof req.body.requiredDate);
        console.log("requiredDate parsed:", new Date(req.body.requiredDate));
      }

      const { error } = schema.validate(req.body, {
        abortEarly: false,
        debug: true,
      });

      console.log("=== Validation Middleware End ===");

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
    } catch (error) {
      console.error("Error in validation middleware:", error);
      return res
        .status(500)
        .json(ApiResponse.error("Internal server error during validation"));
    }
  };
};
