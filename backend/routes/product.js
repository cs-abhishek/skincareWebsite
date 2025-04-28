// backend/routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Search products by name or category
router.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
      category: { $regex: category, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
