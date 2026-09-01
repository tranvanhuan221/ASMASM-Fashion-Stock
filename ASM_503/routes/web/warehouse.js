const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const warehouseController = require('../../controllers/warehouseController');

router.get('/warehouse', authenticateSession, warehouseController.index);

module.exports = router;
