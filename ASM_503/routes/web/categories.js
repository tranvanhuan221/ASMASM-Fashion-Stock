const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const categoryController = require('../../controllers/categoryController');

router.get('/categories', authenticateSession, categoryController.index);

module.exports = router;
