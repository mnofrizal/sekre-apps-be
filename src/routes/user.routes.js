import express from 'express';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { userValidation } from '../validations/user.validation.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// Protect all user routes with authentication
router.use(auth);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateRequest(userValidation.createUser), userController.createUser);
router.put('/:id', validateRequest(userValidation.updateUser), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;