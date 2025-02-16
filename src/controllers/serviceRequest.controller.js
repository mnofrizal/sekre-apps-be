import * as serviceRequestService from "../services/serviceRequest.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Quick Access Controllers
/**
 * Get recent active orders
 */
export const getRecentActiveOrders = async (req, res, next) => {
  try {
    const orders = await serviceRequestService.getRecentActiveOrders(req.user);
    res.json(
      ApiResponse.success("Recent active orders retrieved successfully", orders)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent activities
 */
export const getRecentActivities = async (req, res, next) => {
  try {
    const activities = await serviceRequestService.getRecentActivities(
      req.user
    );
    res.json(
      ApiResponse.success(
        "Recent activities retrieved successfully",
        activities
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get status statistics
 */
export const getStatusStats = async (req, res, next) => {
  try {
    const stats = await serviceRequestService.getStatusStats(req.user);
    res.json(
      ApiResponse.success("Status statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get type statistics
 */
export const getTypeStats = async (req, res, next) => {
  try {
    const stats = await serviceRequestService.getTypeStats(req.user);
    res.json(
      ApiResponse.success("Type statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};

export const getAllServiceRequests = async (req, res, next) => {
  try {
    const { startDate, endDate, status, type, employeeId, page, limit, sort } =
      req.query;
    const requests = await serviceRequestService.getAllServiceRequests(
      req.user,
      {
        startDate,
        endDate,
        status,
        type,
        employeeId,
        page,
        limit,
        sort,
      }
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
    const request = await serviceRequestService.createServiceRequest(
      req.body,
      req.user.id
    );
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
    const { startDate, endDate, status, type, employeeId } = req.query;
    const { requests } = await serviceRequestService.getAllServiceRequests(
      req.user,
      {
        startDate,
        endDate,
        status,
        type,
        employeeId,
        page: 1,
        limit: 1000, // High limit to get all records for export
      }
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
