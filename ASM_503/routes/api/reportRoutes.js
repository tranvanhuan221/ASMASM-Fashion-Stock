const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/reportController');
const { authenticateToken } = require('../../middleware/auth');
const { authorizeRoles } = require('../../middleware/role');

// All reports require admin or manager role
router.use(authenticateToken, authorizeRoles('admin', 'manager'));

router.get('/revenue-profit', reportController.getRevenueProfit);
router.get('/chart-data', reportController.getChartData);
router.get('/stock-value', reportController.getStockValue);
router.get('/top-products', reportController.getTopProducts);

module.exports = router;
