import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllEmployees = async () => {
  return prisma.employee.findMany({
    orderBy: {
      nama: "asc",
    },
  });
};

export const getEmployeeById = async (id) => {
  return prisma.employee.findUnique({
    where: { id },
  });
};

export const getAllSubBidang = async () => {
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      nama: true,
      nomorHp: true,
      isAsman: true,
      subBidang: true,
    },
    orderBy: [{ subBidang: "asc" }, { nama: "asc" }],
  });

  // Group employees by subBidang with detailed information
  const groupedEmployees = employees.reduce((acc, emp) => {
    if (!acc[emp.subBidang]) {
      acc[emp.subBidang] = [];
    }
    acc[emp.subBidang].push({
      id: emp.id,
      name: emp.nama,
      nomorHp: emp.nomorHp,
      isAsman: emp.isAsman,
    });
    return acc;
  }, {});

  return groupedEmployees;
};

export const getEmployeeByNIP = async (nip) => {
  return prisma.employee.findUnique({
    where: { nip },
  });
};

export const getEmployeeByEmail = async (email) => {
  return prisma.employee.findUnique({
    where: { email },
  });
};

export const createEmployee = async (employeeData) => {
  // Check for unique constraints
  const existingNIP = await getEmployeeByNIP(employeeData.nip);
  if (existingNIP) {
    throw new ApiError(409, "NIP already exists");
  }

  const existingEmail = await getEmployeeByEmail(employeeData.email);
  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  return prisma.employee.create({
    data: employeeData,
  });
};

export const updateEmployee = async (id, employeeData) => {
  // Check for unique constraints if updating nip or email
  if (employeeData.nip) {
    const existingNIP = await getEmployeeByNIP(employeeData.nip);
    if (existingNIP && existingNIP.id !== id) {
      throw new ApiError(409, "NIP already exists");
    }
  }

  if (employeeData.email) {
    const existingEmail = await getEmployeeByEmail(employeeData.email);
    if (existingEmail && existingEmail.id !== id) {
      throw new ApiError(409, "Email already exists");
    }
  }

  try {
    return await prisma.employee.update({
      where: { id },
      data: employeeData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await prisma.employee.delete({
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
