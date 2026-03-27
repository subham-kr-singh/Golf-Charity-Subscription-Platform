const express = require('express');
const { z } = require('zod');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  full_name: z.string().min(2).max(100)
}).strict();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
}).strict();

const refreshSchema = z.object({
  refresh_token: z.string()
}).strict();

const forgotSchema = z.object({
  email: z.string().email()
}).strict();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', verifyToken, authController.logout);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/forgot-password', validate(forgotSchema), authController.forgotPassword);

module.exports = router;
