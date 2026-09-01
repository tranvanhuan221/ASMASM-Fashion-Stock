const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../../middleware/auth');
const exportController = require('../../controllers/exportController');

router.get('/export', authenticateSession, exportController.index);
router.get('/export/create', authenticateSession, exportController.create);
router.get('/export/:id', authenticateSession, exportController.view);

module.exports = router;
