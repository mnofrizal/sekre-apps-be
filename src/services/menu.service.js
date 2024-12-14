import prisma from '../lib/prisma.js';

export const getAllMenuItems = async () => {
  return prisma.menuItem.findMany({
    orderBy: {
      name: 'asc'
    }
  });
};

export const getMenuItemById = async (id) => {
  return prisma.menuItem.findUnique({
    where: { id }
  });
};

export const createMenuItem = async (menuData) => {
  return prisma.menuItem.create({
    data: menuData
  });
};

export const updateMenuItem = async (id, menuData) => {
  try {
    return await prisma.menuItem.update({
      where: { id },
      data: menuData
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    await prisma.menuItem.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    if (error.code === 'P2025') {
      return false;
    }
    throw error;
  }
};