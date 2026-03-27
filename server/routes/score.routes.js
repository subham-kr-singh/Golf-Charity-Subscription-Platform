const express = require('express');
const { z } = require('zod');
const scoreController = require('../controllers/score.controller');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');
const requireSubscription = require('../middleware/requireSubscription');

const router = express.Router();

const scoreSchema = z.object({
  value: z.number().int().min(1).max(45),
  played_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
    d => new Date(d) <= new Date(), { message: 'Date cannot be in the future' }
  )
}).strict();

const updateScoreSchema = scoreSchema.partial().strict();

router.get('/', verifyToken, requireSubscription, scoreController.getScores);
router.post('/', verifyToken, requireSubscription, validate(scoreSchema), scoreController.createScore);
router.put('/:id', verifyToken, requireSubscription, validate(updateScoreSchema), scoreController.updateScore);
router.delete('/:id', verifyToken, requireSubscription, scoreController.deleteScore);

module.exports = router;
