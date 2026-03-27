const express = require('express');
const adminReportController = require('../../controllers/admin/admin.report.controller');
const { verifyToken } = require('../../middleware/auth');
const requireAdmin = require('../../middleware/requireAdmin');

const router = express.Router();

router.use(verifyToken, requireAdmin);

router.get('/overview', adminReportController.getOverview);
router.get('/draws', adminReportController.getDrawsReport);
router.get('/charities', adminReportController.getCharitiesReport);

module.exports = router;
