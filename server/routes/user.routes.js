const express = require('express');
const { z } = require('zod');
const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');

const router = express.Router();

const updateMeSchema = z.object({
  full_name: z.string().min(2).optional(),
  phone: z.string().optional(),
  country: z.string().optional()
}).strict();

const charitySelectionSchema = z.object({
  charity_id: z.string().uuid(),
  contribution_percent: z.number().min(10).max(100)
}).strict();

router.get('/me', verifyToken, userController.getMe);
router.put('/me', verifyToken, validate(updateMeSchema), userController.updateMe);
router.delete('/me', verifyToken, requireSubscription, userController.deleteMe);

router.get('/me/charity', verifyToken, userController.getMyCharity);
router.put('/me/charity', verifyToken, requireSubscription, validate(charitySelectionSchema), userController.updateMyCharity);

module.exports = router;
