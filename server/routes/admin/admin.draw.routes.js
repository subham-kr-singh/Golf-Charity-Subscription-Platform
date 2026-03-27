const express = require('express');
const { z } = require('zod');
const adminDrawController = require('../../controllers/admin/admin.draw.controller');
const validate = require('../../middleware/validate');
const { verifyToken } = require('../../middleware/auth');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

const drawSchema = z.object({
  draw_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mode: z.enum(['random', 'algorithmic'])
}).strict();

const updateDrawSchema = z.object({
  mode: z.enum(['random', 'algorithmic']).optional(),
  admin_notes: z.string().optional(),
  draw_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
}).strict();

router.use(verifyToken, requireAdmin);

router.post('/', validate(drawSchema), adminDrawController.createDraw);
router.post('/:id/simulate', adminDrawController.simulateDraw);
router.post('/:id/publish', adminDrawController.publishDraw);
router.get('/', adminDrawController.getDraws);
router.put('/:id', validate(updateDrawSchema), adminDrawController.updateDrawAdmin);
router.delete('/:id', adminDrawController.deleteDrawAdmin);

module.exports = router;
