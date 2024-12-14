import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import menuRoutes from './menu.routes.js';
import employeeRoutes from './employee.routes.js';
import serviceRequestRoutes from './serviceRequest.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/employees', employeeRoutes);
router.use('/service-requests', serviceRequestRoutes);

export default router;