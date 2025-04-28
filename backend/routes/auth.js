const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;  // ✅ include username here
    console.log('Received registration data:', req.body);  // Check what you're receiving
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({ username, email, password: hashedPassword });  // ✅ Save username also
      await newUser.save();
      console.log('User saved successfully');
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Server error during registration' });
    }
  });
  
// ✅ LOGIN route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
