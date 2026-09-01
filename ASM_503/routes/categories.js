const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/categories', function(req, res, next) {
  res.send(' Danh sách categories');
});

module.exports = router;
