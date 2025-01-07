import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import ExcelJS from "exceljs";

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

export const convertUsersToExcel = async (users) => {
  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Define columns
    worksheet.columns = [
      { header: "NO", key: "no", width: 5 },
      { header: "NAME", key: "name", width: 25 },
      { header: "USERNAME", key: "username", width: 20 },
      { header: "EMAIL", key: "email", width: 40 },
      { header: "NOMOR HP", key: "phone", width: 15 },
      { header: "ROLE", key: "role", width: 15 },
      { header: "CREATED AT", key: "createdAt", width: 20 },
      { header: "STATUS", key: "status", width: 10 },
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = {
      bold: true,
      size: 11,
    };
    headerRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE9E9E9" },
    };

    // Add borders to header
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add data rows
    const rows = users.map((user, index) => ({
      no: index + 1,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      createdAt: user.createdAt,
      status: user.isActive ? "Active" : "Inactive",
    }));

    worksheet.addRows(rows);

    // Style data rows
    for (let i = 2; i <= users.length + 1; i++) {
      const row = worksheet.getRow(i);

      // Add borders to each cell
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Center align the NO column
      const noCell = row.getCell(1);
      noCell.alignment = { horizontal: "center", vertical: "middle" };

      // Center align the STATUS column
      const statusCell = row.getCell(8);
      statusCell.alignment = { horizontal: "center", vertical: "middle" };
    }

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw new Error("Failed to generate Excel file: " + error.message);
  }
};
