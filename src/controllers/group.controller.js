import * as groupService from "../services/group.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json(ApiResponse.success("Groups retrieved successfully", groups));
  } catch (error) {
    next(error);
  }
};

export const getGroupByType = async (req, res, next) => {
  try {
    const group = await groupService.getGroupByType(req.params.type);
    if (!group) {
      throw new ApiError(404, "Group not found");
    }
    res.json(ApiResponse.success("Group retrieved successfully", group));
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const group = await groupService.createGroup(req.body);
    res
      .status(201)
      .json(ApiResponse.success("Group created successfully", group));
  } catch (error) {
    if (error.message.includes("already exists")) {
      next(new ApiError(400, error.message));
    } else {
      next(error);
    }
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const group = await groupService.updateGroup(req.params.type, req.body);
    if (!group) {
      throw new ApiError(404, "Group not found");
    }
    res.json(ApiResponse.success("Group updated successfully", group));
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const success = await groupService.deleteGroup(req.params.id);
    if (!success) {
      throw new ApiError(404, "Group not found");
    }
    res.json(ApiResponse.success("Group deleted successfully", null));
  } catch (error) {
    next(error);
  }
};
