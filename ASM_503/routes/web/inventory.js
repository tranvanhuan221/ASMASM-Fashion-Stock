const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const inventoryController = require('../../controllers/inventoryController');

router.get('/inventory', authenticateSession, inventoryController.index);
router.get('/inventory/create', authenticateSession, inventoryController.create);
router.get('/inventory/:id', authenticateSession, inventoryController.view);

module.exports = router;
