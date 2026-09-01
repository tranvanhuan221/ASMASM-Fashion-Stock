const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const { authenticateToken } = require('../../middleware/auth');

router.get('/', authenticateToken, orderController.getAll);
router.get('/:id', authenticateToken, orderController.getById);
router.post('/', authenticateToken, orderController.create);
router.put('/:id/status', authenticateToken, orderController.updateStatus);

module.exports = router;
