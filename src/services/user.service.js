import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

const userSelect = {
  id: true,
  username: true,
  email: true,
  name: true,
  avatar: true,
  role: true,
  isAdminNotify: true,
  phone: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export const getAllUsers = async () => {
  const users = await prisma.dashboardUser.findMany({
    select: userSelect,
  });
  return users;
};

export const getUserById = async (id) => {
  const user = await prisma.dashboardUser.findUnique({
    where: { id },
    select: userSelect,
  });
  return user;
};

export const getUserByEmail = async (email) => {
  return prisma.dashboardUser.findUnique({
    where: { email },
  });
};

export const createUser = async (userData) => {
  const user = await prisma.dashboardUser.create({
    data: userData,
    select: userSelect,
  });
  return user;
};

export const updateUser = async (id, userData) => {
  const user = await prisma.dashboardUser.update({
    where: { id },
    data: userData,
    select: userSelect,
  });
  return user;
};

export const changeNotifyStatus = async (id, userData) => {
  const { isAdminNotify, phone } = userData;
  // First, set isAdminNotify to false and phone to null for all users
  await prisma.dashboardUser.updateMany({
    data: { isAdminNotify: false },
  });

  // Then, set isAdminNotify to true and update phone for the specified user
  const user = await prisma.dashboardUser.update({
    where: { id },
    data: { isAdminNotify, phone },
    select: userSelect,
  });
  return user;
};

export const deleteUser = async (id) => {
  try {
    await prisma.dashboardUser.delete({
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
