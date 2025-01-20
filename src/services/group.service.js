import prisma from "../lib/prisma.js";

export const getAllGroups = async () => {
  return prisma.group.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getGroupByType = async (type) => {
  return prisma.group.findFirst({
    where: { type },
  });
};

export const createGroup = async (groupData) => {
  return prisma.$transaction(async (tx) => {
    const existingGroup = await tx.group.findFirst({
      where: { type: groupData.type },
    });

    if (existingGroup) {
      // Update existing group
      return tx.group.update({
        where: { id: existingGroup.id },
        data: {
          ...groupData,
          type: undefined, // Prevent type from being updated
        },
      });
    }

    // Create new group
    return tx.group.create({
      data: groupData,
    });
  });
};

export const updateGroup = async (type, groupData) => {
  try {
    // Ensure we can't change the type
    delete groupData.type;

    return await prisma.group.update({
      where: { type },
      data: groupData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export const deleteGroup = async (id) => {
  try {
    await prisma.group.delete({
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
