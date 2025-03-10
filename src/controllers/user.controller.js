import * as userService from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(ApiResponse.success("Users retrieved successfully", users));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json(ApiResponse.success("User retrieved successfully", user));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res
      .status(201)
      .json(ApiResponse.success("User created successfully", user));
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json(ApiResponse.success("User updated successfully", user));
  } catch (error) {
    next(error);
  }
};

export const changeNotifyStatus = async (req, res, next) => {
  try {
    const user = await userService.changeNotifyStatus(req.params.id, req.body);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json(
      ApiResponse.success("Notification status changed successfully", user)
    );
  } catch (error) {
    next(error);
  }
};

export const updatePushToken = async (req, res, next) => {
  try {
    const user = await userService.updatePushToken(
      req.params.id,
      req.body.pushToken
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json(ApiResponse.success("Push token updated successfully", user));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const success = await userService.deleteUser(req.params.id);
    if (!success) {
      throw new ApiError(404, "User not found");
    }
    res
      .status(200)
      .json(ApiResponse.success("User deleted successfully", null));
  } catch (error) {
    next(error);
  }
};

export const exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found");
    }

    const buffer = await userService.convertUsersToExcel(users);

    // Set proper headers
    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="users.xlsx"',
      "Content-Length": buffer.length,
    });

    res.send(buffer);
  } catch (error) {
    next(error);
  }
};
