import * as employeeService from "../services/employee.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(
      ApiResponse.success("Employees retrieved successfully", employees)
    );
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }
    res.json(ApiResponse.success("Employee retrieved successfully", employee));
  } catch (error) {
    next(error);
  }
};

export const getAllSubBidang = async (req, res, next) => {
  try {
    const subBidangList = await employeeService.getAllSubBidang();
    res.json(
      ApiResponse.success(
        "SubBidang list retrieved successfully",
        subBidangList
      )
    );
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res
      .status(201)
      .json(ApiResponse.success("Employee created successfully", employee));
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }
    res.json(ApiResponse.success("Employee updated successfully", employee));
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const success = await employeeService.deleteEmployee(req.params.id);
    if (!success) {
      throw new ApiError(404, "Employee not found");
    }
    res.json(ApiResponse.success("Employee deleted successfully", null));
  } catch (error) {
    next(error);
  }
};

export const importEmployees = async (req, res, next) => {
  try {
    // Check if file exists
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const result = await employeeService.importEmployeesService(req.file);

    res.status(200).json(
      ApiResponse.success(
        `Successfully replaced ${result.deleted} existing employees with ${result.created.length} new employees`,
        {
          deletedCount: result.deleted,
          newEmployees: result.created,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};
