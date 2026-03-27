const express = require('express');
const webhookController = require('../controllers/webhook.controller');

const router = express.Router();

// Body parsing logic handled in index.js for this router (express.raw)
router.post('/', webhookController.handleStripeWebhook);

module.exports = router;
