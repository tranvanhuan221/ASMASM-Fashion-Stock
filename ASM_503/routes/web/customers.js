const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const customerController = require('../../controllers/customerController');

router.get('/customers', authenticateSession, customerController.index);

module.exports = router;
