const express = require('express');
const router = express.Router();
const exportController = require('../../controllers/exportController');
const { authenticateToken } = require('../../middleware/auth');
const { authorizeRoles } = require('../../middleware/role');

// Export receipt creation
router.post('/receipts', authenticateToken, authorizeRoles('admin', 'manager', 'staff'), exportController.createReceipt);

module.exports = router;
