import * as authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(ApiResponse.success('Login successful', result));
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(ApiResponse.success('Registration successful', result));
  } catch (error) {
    next(error);
  }
};