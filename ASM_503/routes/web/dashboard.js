const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const dashboardController = require('../../controllers/dashboardController');

router.get('/dashboard', authenticateSession, dashboardController.index);

module.exports = router;
