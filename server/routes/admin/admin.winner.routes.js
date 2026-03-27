const express = require('express');
const { z } = require('zod');
const adminWinnerController = require('../../controllers/admin/admin.winner.controller');
const validate = require('../../middleware/validate');
const { verifyToken } = require('../../middleware/auth');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

const verifyWinnerSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  admin_notes: z.string().optional()
}).strict();

const payoutWinnerSchema = z.object({
  admin_notes: z.string().optional()
}).strict();

router.use(verifyToken, requireAdmin);

router.get('/', adminWinnerController.getWinnersAdmin);
router.put('/:id/verify', validate(verifyWinnerSchema), adminWinnerController.verifyWinnerAdmin);
router.put('/:id/payout', validate(payoutWinnerSchema), adminWinnerController.payoutWinnerAdmin);

module.exports = router;
