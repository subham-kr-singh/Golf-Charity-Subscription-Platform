const express = require('express');
const { z } = require('zod');
const adminUserController = require('../../controllers/admin/admin.user.controller');
const validate = require('../../middleware/validate');
const { verifyToken } = require('../../middleware/auth');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

const adminReplaceScoresSchema = z.object({
  scores: z.array(z.object({
    value: z.number().int().min(1).max(45),
    played_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
      d => new Date(d) <= new Date(), { message: 'Date cannot be in the future' }
    )
  })).max(5)
}).strict();

const adminUpdateSubSchema = z.object({
  status: z.enum(['active', 'cancelled', 'lapsed'])
}).strict();

router.use(verifyToken, requireAdmin);

router.get('/', adminUserController.getUsers);
router.get('/:id', adminUserController.getUserById);
router.put('/:id/scores', validate(adminReplaceScoresSchema), adminUserController.replaceScores);
router.put('/:id/subscription', validate(adminUpdateSubSchema), adminUserController.updateSubscription);

module.exports = router;
