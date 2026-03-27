const express = require('express');
const { z } = require('zod');
const adminCharityController = require('../../controllers/admin/admin.charity.controller');
const validate = require('../../middleware/validate');
const { verifyToken } = require('../../middleware/auth');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

const adminCharitySchema = z.object({
  name: z.string().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/).max(100),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  website_url: z.string().url().optional(),
  upcoming_events: z.array(z.object({
    title: z.string(),
    date: z.string(),
    location: z.string().optional(),
    description: z.string().optional()
  })).optional().default([]),
  is_featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true)
}).strict();

const updateCharitySchema = adminCharitySchema.partial().strict();

router.use(verifyToken, requireAdmin);

router.post('/', validate(adminCharitySchema), adminCharityController.createCharityAdmin);
router.put('/:id', validate(updateCharitySchema), adminCharityController.updateCharityAdmin);
router.delete('/:id', adminCharityController.deleteCharityAdmin);

module.exports = router;
