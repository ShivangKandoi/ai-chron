const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { executeCode } = require('../services/codeExecutor');

// Run code
router.post('/run', auth, async (req, res) => {
  try {
    const { code, language } = req.body;
    const output = await executeCode(code, language);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save code
router.post('/save', auth, async (req, res) => {
  try {
    const { code, filename, projectId } = req.body;
    // Add code to save the file to the project
    res.json({ message: 'Code saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file content
router.get('/file/:id', auth, async (req, res) => {
  try {
    // Add code to retrieve file content
    res.json({ content: '// Your code here' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 