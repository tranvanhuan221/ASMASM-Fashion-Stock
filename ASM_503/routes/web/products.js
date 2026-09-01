const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const productController = require('../../controllers/productController');

router.get('/products', authenticateSession, productController.index);

module.exports = router;
