const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const Feedback = require('../models/Feedback');

// POST a new contact message 
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message securely saved to Atlas!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// POST new application feedback 
router.post('/feedback', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const newFeedback = new Feedback({ 
      rating, 
      comment,
      user: req.user.id,
      userEmail: req.user.email
    });
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback successfully recorded!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

module.exports = router;
