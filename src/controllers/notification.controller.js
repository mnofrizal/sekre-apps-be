import * as notificationService from "../services/notification.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendNotificationToUsers = async (req, res, next) => {
  try {
    const { userIds, notification } = req.body;

    const result = await notificationService.sendNotificationToUsers(
      userIds,
      notification
    );

    if (result.errors) {
      // Still return 200 but include error details in response
      return res.json(
        ApiResponse.success("Notifications sent with some errors", {
          ...result,
          message: "Some notifications failed to send",
        })
      );
    }

    res.json(
      ApiResponse.success("Notifications sent successfully", {
        ...result,
        message: "All notifications sent successfully",
      })
    );
  } catch (error) {
    next(error);
  }
};

export const sendNotifications = async (req, res, next) => {
  try {
    const { tokens, notification } = req.body;

    const result = await notificationService.sendNotifications(
      tokens,
      notification
    );

    if (result.errors) {
      // Still return 200 but include error details in response
      return res.json(
        ApiResponse.success("Notifications sent with some errors", {
          ...result,
          message: "Some notifications failed to send",
        })
      );
    }

    res.json(
      ApiResponse.success("Notifications sent successfully", {
        ...result,
        message: "All notifications sent successfully",
      })
    );
  } catch (error) {
    next(error);
  }
};

export const sendNotificationToRole = async (req, res, next) => {
  try {
    const { role, notification } = req.body;

    const result = await notificationService.sendNotificationToRole(
      role,
      notification
    );

    if (result.errors) {
      // Still return 200 but include error details in response
      return res.json(
        ApiResponse.success("Notifications sent with some errors", {
          ...result,
          message: "Some notifications failed to send",
        })
      );
    }

    res.json(
      ApiResponse.success("Notifications sent successfully", {
        ...result,
        message: "All notifications sent successfully",
      })
    );
  } catch (error) {
    next(error);
  }
};

export const handleInvalidTokens = async (req, res, next) => {
  try {
    const { tokens } = req.body;

    if (!Array.isArray(tokens) || tokens.length === 0) {
      throw new ApiError(400, "Invalid tokens array provided");
    }

    const result = await notificationService.handleInvalidTokens(tokens);

    res.json(
      ApiResponse.success("Invalid tokens handled successfully", result)
    );
  } catch (error) {
    next(error);
  }
};
