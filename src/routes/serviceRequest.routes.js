import express from 'express';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { serviceRequestValidation } from '../validations/serviceRequest.validation.js';
import * as serviceRequestController from '../controllers/serviceRequest.controller.js';

const router = express.Router();

// Protect all routes with authentication
router.use(auth);

router.get('/', serviceRequestController.getAllServiceRequests);
router.get('/:id', serviceRequestController.getServiceRequestById);
router.post('/', validateRequest(serviceRequestValidation.createServiceRequest), serviceRequestController.createServiceRequest);
router.put('/:id', validateRequest(serviceRequestValidation.updateServiceRequest), serviceRequestController.updateServiceRequest);
router.delete('/:id', serviceRequestController.deleteServiceRequest);

// Status management
router.patch('/:id/status', validateRequest(serviceRequestValidation.updateStatus), serviceRequestController.updateRequestStatus);

export default router;