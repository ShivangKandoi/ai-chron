import express from 'express';
import { authenticate } from '../middleware/auth';
import axios from 'axios';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.post('/chat', authenticate, async (req, res) => {
  try {
    const { message } = req.body;

    console.log('Sending request to Grok API');

    const response = await axios({
      method: 'post',
      url: 'https://api.x.ai/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xai-L1XQQOlNvkKACfHcLf9PO7CqQhmpHvuapKnSyES30rFBxzwrRHJLU0y4uTIWmXYMFpRKueRc2mamU157'
      },
      data: {
        messages: [
          {
            role: "system",
            content: "You are an AI programming assistant."
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0
      }
    });

    console.log('Grok API response:', response.status);

    if (!response.data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from Grok API');
    }

    res.json({ response: response.data.choices[0].message.content });
  } catch (err) {
    console.error('AI Chat Error:', err.response?.data || err.message);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: err.response?.data?.error || err.message
    });
  }
});

export default router; 