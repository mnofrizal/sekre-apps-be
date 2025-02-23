import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

const pushTokenSelect = {
  id: true,
  token: true,
  isActive: true,
  device: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
};

export const getAllPushTokens = async () => {
  return prisma.pushToken.findMany({
    select: pushTokenSelect,
  });
};

export const getPushTokenById = async (id) => {
  return prisma.pushToken.findUnique({
    where: { id },
    select: pushTokenSelect,
  });
};

export const getPushTokensByUserId = async (userId) => {
  return prisma.pushToken.findMany({
    where: { userId },
    select: pushTokenSelect,
  });
};

export const createPushToken = async (userId, tokenData) => {
  const existingToken = await prisma.pushToken.findUnique({
    where: { token: tokenData.token },
  });

  if (existingToken) {
    // Update existing token with new userId and device info
    return prisma.pushToken.update({
      where: { token: tokenData.token },
      data: {
        userId,
        device: tokenData.device,
        isActive: true,
      },
      select: pushTokenSelect,
    });
  }

  return prisma.pushToken.create({
    data: {
      ...tokenData,
      userId,
    },
    select: pushTokenSelect,
  });
};

export const updatePushToken = async (id, tokenData) => {
  if (tokenData.token) {
    const existingToken = await prisma.pushToken.findUnique({
      where: { token: tokenData.token },
    });

    if (existingToken && existingToken.id !== id) {
      throw new ApiError(400, "Push token already exists");
    }
  }

  return prisma.pushToken.update({
    where: { id },
    data: tokenData,
    select: pushTokenSelect,
  });
};

export const deletePushToken = async (id) => {
  try {
    await prisma.pushToken.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error.code === "P2025") {
      return false;
    }
    throw error;
  }
};

export const deletePushTokenByValue = async (token) => {
  try {
    await prisma.pushToken.delete({
      where: { token },
    });
    return true;
  } catch (error) {
    if (error.code === "P2025") {
      return false;
    }
    throw error;
  }
};

export const deleteUserPushTokens = async (userId) => {
  try {
    await prisma.pushToken.deleteMany({
      where: { userId },
    });
    return true;
  } catch (error) {
    return false;
  }
};
