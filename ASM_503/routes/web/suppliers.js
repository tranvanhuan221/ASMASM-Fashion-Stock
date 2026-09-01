const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const supplierController = require('../../controllers/supplierController');

router.get('/suppliers', authenticateSession, supplierController.index);

module.exports = router;
