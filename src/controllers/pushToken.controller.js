import * as pushTokenService from "../services/pushToken.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllPushTokens = async (req, res, next) => {
  try {
    const tokens = await pushTokenService.getAllPushTokens();
    res.json(ApiResponse.success("Push tokens retrieved successfully", tokens));
  } catch (error) {
    next(error);
  }
};

export const getPushTokenById = async (req, res, next) => {
  try {
    const token = await pushTokenService.getPushTokenById(req.params.id);
    if (!token) {
      throw new ApiError(404, "Push token not found");
    }
    res.json(ApiResponse.success("Push token retrieved successfully", token));
  } catch (error) {
    next(error);
  }
};

export const getPushTokensByUserId = async (req, res, next) => {
  try {
    const tokens = await pushTokenService.getPushTokensByUserId(
      req.params.userId
    );
    res.json(
      ApiResponse.success("User's push tokens retrieved successfully", tokens)
    );
  } catch (error) {
    next(error);
  }
};

export const createPushToken = async (req, res, next) => {
  try {
    const token = await pushTokenService.createPushToken(req.user.id, req.body);
    res
      .status(201)
      .json(ApiResponse.success("Push token created successfully", token));
  } catch (error) {
    next(error);
  }
};

export const updatePushToken = async (req, res, next) => {
  try {
    const token = await pushTokenService.updatePushToken(
      req.params.id,
      req.body
    );
    if (!token) {
      throw new ApiError(404, "Push token not found");
    }
    res.json(ApiResponse.success("Push token updated successfully", token));
  } catch (error) {
    next(error);
  }
};

export const deletePushToken = async (req, res, next) => {
  try {
    const success = await pushTokenService.deletePushToken(req.params.id);
    if (!success) {
      throw new ApiError(404, "Push token not found");
    }
    res.json(ApiResponse.success("Push token deleted successfully", null));
  } catch (error) {
    next(error);
  }
};

export const deletePushTokenByValue = async (req, res, next) => {
  try {
    const success = await pushTokenService.deletePushTokenByValue(
      req.params.token
    );
    if (!success) {
      throw new ApiError(404, "Push token not found");
    }
    res.json(ApiResponse.success("Push token deleted successfully", null));
  } catch (error) {
    next(error);
  }
};

export const deleteUserPushTokens = async (req, res, next) => {
  try {
    await pushTokenService.deleteUserPushTokens(req.params.userId);
    res.json(
      ApiResponse.success("User's push tokens deleted successfully", null)
    );
  } catch (error) {
    next(error);
  }
};
