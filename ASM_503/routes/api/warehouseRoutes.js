const express = require('express');
const router = express.Router();
const warehouseController = require('../../controllers/warehouseController');
const { authenticateToken } = require('../../middleware/auth');
const { authorizeRoles } = require('../../middleware/role');

router.get('/zones', authenticateToken, warehouseController.getZones);
router.post('/zones', authenticateToken, authorizeRoles('admin', 'manager'), warehouseController.createZone);

router.get('/lots', authenticateToken, warehouseController.getLots);
router.post('/lots', authenticateToken, authorizeRoles('admin', 'manager'), warehouseController.createLot);

router.get('/shelves', authenticateToken, warehouseController.getShelves);
router.post('/shelves', authenticateToken, authorizeRoles('admin', 'manager'), warehouseController.createShelf);

module.exports = router;
