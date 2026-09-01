const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventoryController');
const { authenticateToken } = require('../../middleware/auth');
const { authorizeRoles } = require('../../middleware/role');

// Stock queries
router.get('/stock', authenticateToken, inventoryController.getStock);

// Import receipt creation
router.post('/receipts', authenticateToken, authorizeRoles('admin', 'manager', 'staff'), inventoryController.createReceipt);

module.exports = router;
