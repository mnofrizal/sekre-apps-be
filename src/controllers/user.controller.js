import * as userService from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(ApiResponse.success('Users retrieved successfully', users));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json(ApiResponse.success('User retrieved successfully', user));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(ApiResponse.success('User created successfully', user));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json(ApiResponse.success('User updated successfully', user));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const success = await userService.deleteUser(req.params.id);
    if (!success) {
      throw new ApiError(404, 'User not found');
    }
    res.status(200).json(ApiResponse.success('User deleted successfully', null));
  } catch (error) {
    next(error);
  }
};