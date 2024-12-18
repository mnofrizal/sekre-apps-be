import * as approvalService from "../services/approval.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createApprovalLink = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { type, expiresIn } = req.body;
    const approvalLink = await approvalService.createApprovalLink(
      requestId,
      type,
      expiresIn
    );
    res
      .status(201)
      .json(
        ApiResponse.success("Approval link created successfully", approvalLink)
      );
  } catch (error) {
    next(error);
  }
};

export const getApprovalLink = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const approvalLink = await approvalService.getApprovalLinkByRequestId(
      requestId
    );
    if (!approvalLink) {
      throw new ApiError(404, "Approval link not found");
    }
    res.json(
      ApiResponse.success("Approval link retrieved successfully", approvalLink)
    );
  } catch (error) {
    next(error);
  }
};

export const verifyApprovalToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const approvalLink = await approvalService.verifyToken(token);
    res.json(ApiResponse.success("Token verified successfully", approvalLink));
  } catch (error) {
    next(error);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { response, responseNote } = req.body;
    const result = await approvalService.processResponse(
      token,
      response,
      responseNote
    );
    res.json(ApiResponse.success("Response processed successfully", result));
  } catch (error) {
    next(error);
  }
};

export const deleteApprovalLink = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const success = await approvalService.deleteApprovalLink(requestId);
    if (!success) {
      throw new ApiError(404, "Approval link not found");
    }
    res.json(ApiResponse.success("Approval link deleted successfully", null));
  } catch (error) {
    next(error);
  }
};
