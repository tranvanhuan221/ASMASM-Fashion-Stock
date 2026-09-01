const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const { authorizeRoles } = require('../../middleware/role');
const reportController = require('../../controllers/reportController');

// Only admin and manager can see reports
router.get('/reports', authenticateSession, authorizeRoles('admin', 'manager'), reportController.index);

module.exports = router;
