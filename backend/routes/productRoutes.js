const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Get products by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;
    try {
        const products = await Product.find({ category })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const count = await Product.countDocuments({ category });
        res.json({ products, count, page, pages: Math.ceil(count / limit) });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;