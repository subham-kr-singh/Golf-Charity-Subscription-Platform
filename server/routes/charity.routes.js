const express = require('express');
const charityController = require('../controllers/charity.controller');

const router = express.Router();

router.get('/', charityController.getCharities);
router.get('/:slug', charityController.getCharityBySlug);

module.exports = router;
