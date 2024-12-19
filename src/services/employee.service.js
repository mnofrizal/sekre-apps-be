import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import XLSX from "xlsx";
import { promises as fs } from "fs";
import path from "path";

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

// Ensure uploads directory exists
const createUploadsDir = async () => {
  const uploadsDir = path.join(process.cwd(), "uploads");
  try {
    await fs.access(uploadsDir);
  } catch (error) {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
  return uploadsDir;
};

// Safe file deletion utility
const safeDeleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error deleting file:", error);
    // Don't throw, just log the error
  }
};

export const importEmployeesService = async (file) => {
  let filePath = null;

  try {
    // Ensure uploads directory exists
    const uploadsDir = await createUploadsDir();
    filePath = path.join(uploadsDir, file.filename);

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON with specific headers
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: [
        "bagian",
        "name",
        "nip",
        "subBidang",
        "jabatan",
        "nomorHP",
        "isAsman",
        "email",
      ],
      range: 1, // Skip header row
    });

    // Process and format the data
    const formattedData = data.map((row, index) => {
      // Validate required fields
      if (
        !row.nip ||
        !row.name ||
        !row.jabatan ||
        !row.bagian ||
        !row.subBidang
      ) {
        throw new ApiError(
          400,
          `Row ${
            index + 2
          }: Missing required fields (NIP, Name, Jabatan, Bagian, or SubBidang)`
        );
      }

      return {
        nip: String(row.nip || "").trim(),
        nama: String(row.name || "").trim(),
        jabatan: String(row.jabatan || "").trim(),
        bagian: String(row.bagian || "").trim(),
        subBidang: String(row.subBidang || "").trim(),
        email: row.email ? String(row.email).trim() : null,
        nomorHp: row.nomorHP ? String(row.nomorHP).trim() : null,
        isAsman: String(row.isAsman || "").toLowerCase() === "true",
      };
    });

    // Use transaction to ensure all operations succeed or none do
    const result = await prisma.$transaction(async (tx) => {
      // First, count existing records
      const existingCount = await tx.employee.count();

      // Delete all existing records
      await tx.employee.deleteMany({});

      console.log(`Deleted ${existingCount} existing records`);

      // Insert new records
      const createdEmployees = [];
      for (const employeeData of formattedData) {
        const employee = await tx.employee.create({
          data: employeeData,
        });
        createdEmployees.push(employee);
      }

      return {
        deleted: existingCount,
        created: createdEmployees,
      };
    });

    // Clean up the file after successful processing
    await safeDeleteFile(filePath);

    return result;
  } catch (error) {
    // Clean up file in case of error
    if (filePath) {
      await safeDeleteFile(filePath);
    }

    // Handle specific errors
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle Prisma errors
    if (error.code) {
      switch (error.code) {
        case "P2002":
          throw new ApiError(409, "Duplicate entry found in Excel data");
        case "P2003":
          throw new ApiError(400, "Invalid reference in data");
        default:
          console.error("Database error:", error);
          throw new ApiError(500, "Database error occurred");
      }
    }

    // Log and rethrow unhandled errors
    console.error("Error processing Excel file:", error);
    throw new ApiError(500, "Error processing Excel file");
  }
};
