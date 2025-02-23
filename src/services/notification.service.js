import { Expo } from "expo-server-sdk";
import prisma from "../lib/prisma.js";

// Create a new Expo SDK client
const expo = new Expo();

/**
 * Send push notification to specific users
 * @param {string[]} userIds - Array of user IDs to send notification to
 * @param {object} notification - Notification data
 * @param {string} notification.title - Notification title
 * @param {string} notification.body - Notification body
 * @param {object} notification.data - Additional data to send
 */
export const sendNotificationToUsers = async (userIds, notification) => {
  try {
    // Get all active push tokens for the specified users
    const tokens = await prisma.pushToken.findMany({
      where: {
        userId: { in: userIds },
        isActive: true,
      },
      select: {
        token: true,
      },
    });

    const pushTokens = tokens.map((t) => t.token);
    return sendNotifications(pushTokens, notification);
  } catch (error) {
    console.error("Error sending notification to users:", error);
    throw error;
  }
};

/**
 * Send push notification to specific tokens
 * @param {string[]} pushTokens - Array of Expo push tokens
 * @param {object} notification - Notification data
 * @param {string} notification.title - Notification title
 * @param {string} notification.body - Notification body
 * @param {object} notification.data - Additional data to send
 */
export const sendNotifications = async (pushTokens, notification) => {
  try {
    // Create the messages that we want to send to clients
    const messages = [];

    for (const pushToken of pushTokens) {
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: "default",
        title: notification.title,
        body: notification.body,
        data: notification.data || {},
        priority: "high",
        channelId: "default",
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    // Send the chunks to the Expo push notification service
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error("Error sending chunk:", error);
      }
    }

    // Handle any errors
    const errors = tickets
      .filter((ticket) => ticket.status === "error")
      .map((ticket) => ({
        errorCode: ticket.details?.error,
        errorMessage: getErrorMessage(ticket.details?.error),
      }));

    if (errors.length > 0) {
      console.error("Notification errors:", errors);
    }

    return {
      success: tickets.some((ticket) => ticket.status === "ok"),
      errors: errors.length > 0 ? errors : null,
      ticketCount: tickets.length,
    };
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw error;
  }
};

/**
 * Get human-readable error message for Expo push notification errors
 */
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "DeviceNotRegistered":
      return "The device is not registered for push notifications";
    case "MessageTooBig":
      return "The message was too large to send";
    case "MessageRateExceeded":
      return "Too many messages were sent to this device";
    case "InvalidCredentials":
      return "The credentials for sending notifications were invalid";
    default:
      return "An unknown error occurred while sending the notification";
  }
};

/**
 * Handle invalid or expired tokens
 */
export const sendNotificationToRole = async (role, notification) => {
  try {
    // Get all active tokens for users with the specified role
    const tokens = await prisma.pushToken.findMany({
      where: {
        isActive: true,
        user: {
          role: role,
          isActive: true,
        },
      },
      select: {
        token: true,
      },
    });

    const pushTokens = tokens.map((t) => t.token);
    return sendNotifications(pushTokens, notification);
  } catch (error) {
    console.error("Error sending notification to role:", error);
    throw error;
  }
};

export const handleInvalidTokens = async (invalidTokens) => {
  try {
    // Mark tokens as inactive
    await prisma.pushToken.updateMany({
      where: {
        token: {
          in: invalidTokens,
        },
      },
      data: {
        isActive: false,
      },
    });

    return {
      success: true,
      updatedCount: invalidTokens.length,
    };
  } catch (error) {
    console.error("Error handling invalid tokens:", error);
    throw error;
  }
};
