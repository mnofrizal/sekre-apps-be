import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware to check if user has required role
 * @param {string|string[]} roles - Required role(s)
 */
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const hasRole = Array.isArray(roles)
      ? roles.includes(req.user.role)
      : roles === req.user.role;

    if (!hasRole) {
      return next(
        new ApiError(403, "You don't have permission to access this resource")
      );
    }

    next();
  };
};
