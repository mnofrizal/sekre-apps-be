import * as serviceRequestService from "../services/serviceRequest.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllServiceRequests = async (req, res, next) => {
  console.log(req.user);
  try {
    const requests = await serviceRequestService.getAllServiceRequests(
      req.user
    );
    res.json(
      ApiResponse.success("Service requests retrieved successfully", requests)
    );
  } catch (error) {
    next(error);
  }
};

export const getPendingServiceRequests = async (req, res, next) => {
  console.log(req.user);
  try {
    const requests = await serviceRequestService.getPendingServiceRequests(
      req.user
    );
    res.json(
      ApiResponse.success(
        "Pending service requests retrieved successfully",
        requests
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getServiceRequestById = async (req, res, next) => {
  try {
    const request = await serviceRequestService.getServiceRequestById(
      req.params.id
    );
    if (!request) {
      throw new ApiError(404, "Service request not found");
    }
    res.json(
      ApiResponse.success("Service request retrieved successfully", request)
    );
  } catch (error) {
    next(error);
  }
};

export const createServiceRequest = async (req, res, next) => {
  try {
    // Better date logging
    console.log("Raw request body:", {
      ...req.body,
      requestDate: new Date(req.body.requestDate),
      requiredDate: new Date(req.body.requiredDate),
    });

    console.log("Request date value:", req.body.requestDate);
    console.log("Required date value:", req.body.requiredDate);
    console.log("Request date parsed:", new Date(req.body.requestDate));
    console.log("Required date parsed:", new Date(req.body.requiredDate));

    const request = await serviceRequestService.createServiceRequest(
      req.body,
      req.user.id
    );
    console.log("request adalah", req.body);
    res
      .status(201)
      .json(
        ApiResponse.success("Service request created successfully", request)
      );
  } catch (error) {
    next(error);
  }
};

export const updateServiceRequest = async (req, res, next) => {
  try {
    const request = await serviceRequestService.updateServiceRequest(
      req.params.id,
      req.body
    );
    if (!request) {
      throw new ApiError(404, "Service request not found");
    }
    res.json(
      ApiResponse.success("Service request updated successfully", request)
    );
  } catch (error) {
    next(error);
  }
};

export const deleteServiceRequest = async (req, res, next) => {
  try {
    const success = await serviceRequestService.deleteServiceRequest(
      req.params.id
    );
    if (!success) {
      throw new ApiError(404, "Service request not found");
    }
    res.json(ApiResponse.success("Service request deleted successfully", null));
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const request = await serviceRequestService.updateRequestStatus(
      req.params.id,
      status,
      req.user.id,
      notes
    );
    res.json(
      ApiResponse.success(
        "Service request status updated successfully",
        request
      )
    );
  } catch (error) {
    next(error);
  }
};

export const completeRequest = async (req, res, next) => {
  try {
    const { notes } = req.body;
    const request = await serviceRequestService.completeRequest(
      req.params.id,
      req.user.id,
      notes
    );
    res.json(
      ApiResponse.success("Service request completed successfully", request)
    );
  } catch (error) {
    next(error);
  }
};

export const exportServiceRequestsToExcel = async (req, res, next) => {
  try {
    const requests = await serviceRequestService.getAllServiceRequests(
      req.user
    );
    const buffer = await serviceRequestService.convertServiceRequestsToExcel(
      requests
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=serviceRequests.xlsx"
    );
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};
