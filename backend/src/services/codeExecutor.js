// Temporary version without Docker dependency
async function executeCode(code, language) {
  try {
    if (language === 'javascript') {
      // Simple eval for testing (NOT for production!)
      const result = eval(code);
      return String(result);
    }
    return `Code execution for ${language} is not available in development mode`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

module.exports = { executeCode }; 