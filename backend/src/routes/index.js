const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router; 