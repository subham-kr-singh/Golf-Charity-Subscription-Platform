const express = require('express');
const { z } = require('zod');
const subController = require('../controllers/subscription.controller');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');

const router = express.Router();

const subscribeSchema = z.object({
  plan: z.enum(['monthly', 'yearly'])
}).strict();

router.post('/checkout', verifyToken, validate(subscribeSchema), subController.checkout);
router.get('/status', verifyToken, subController.getStatus);
router.post('/cancel', verifyToken, requireSubscription, subController.cancel);
router.get('/portal', verifyToken, subController.portal);

module.exports = router;
