const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const orderController = require('../../controllers/orderController');

router.get('/orders', authenticateSession, orderController.getAll);
router.get('/orders/create', authenticateSession, orderController.renderCreateForm);
router.get('/orders/:id', authenticateSession, orderController.getById);
router.post('/orders', authenticateSession, orderController.create);
router.post('/orders/:id/status', authenticateSession, orderController.updateStatus);

module.exports = router;
