import prisma from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllUsers = async () => {
  const users = await prisma.dashboardUser.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export const getUserById = async (id) => {
  const user = await prisma.dashboardUser.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
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
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const updateUser = async (id, userData) => {
  const user = await prisma.dashboardUser.update({
    where: { id },
    data: userData,
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
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
    if (error.code === 'P2025') {
      return false;
    }
    throw error;
  }
};