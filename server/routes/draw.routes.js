const express = require('express');
const drawController = require('../controllers/draw.controller');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/latest', optionalAuth, drawController.getLatest);
router.get('/:id/results', drawController.getResults);
router.get('/history', drawController.getHistory);

module.exports = router;
