import express from 'express';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { menuValidation } from '../validations/menu.validation.js';
import * as menuController from '../controllers/menu.controller.js';

const router = express.Router();

// Protect all menu routes with authentication
router.use(auth);

router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post('/', validateRequest(menuValidation.createMenuItem), menuController.createMenuItem);
router.put('/:id', validateRequest(menuValidation.updateMenuItem), menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

export default router;