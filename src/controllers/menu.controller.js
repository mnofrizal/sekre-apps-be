import * as menuService from '../services/menu.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllMenuItems = async (req, res, next) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    res.json(ApiResponse.success('Menu items retrieved successfully', menuItems));
  } catch (error) {
    next(error);
  }
};

export const getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await menuService.getMenuItemById(req.params.id);
    if (!menuItem) {
      throw new ApiError(404, 'Menu item not found');
    }
    res.json(ApiResponse.success('Menu item retrieved successfully', menuItem));
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuService.createMenuItem(req.body);
    res.status(201).json(ApiResponse.success('Menu item created successfully', menuItem));
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuService.updateMenuItem(req.params.id, req.body);
    if (!menuItem) {
      throw new ApiError(404, 'Menu item not found');
    }
    res.json(ApiResponse.success('Menu item updated successfully', menuItem));
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const success = await menuService.deleteMenuItem(req.params.id);
    if (!success) {
      throw new ApiError(404, 'Menu item not found');
    }
    res.json(ApiResponse.success('Menu item deleted successfully', null));
  } catch (error) {
    next(error);
  }
};