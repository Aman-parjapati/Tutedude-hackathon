const express = require('express');
const router = express.Router();
// const db = require('../db'); // Make sure db.js uses dotenv and exports MySQL pool

router.post('/query', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "No question provided." });
  }

  try {
    const q = question.toLowerCase();

    // Intent 1: All products
    if (q.includes("all products")) {
      const [rows] = await db.query('SELECT name, price FROM products LIMIT 10');
      const answer = rows.length
        ? rows.map(r => `${r.name} - ₹${r.price}`).join('\n')
        : "No products found.";
      return res.json({ answer });
    }

    // Intent 2: Top vendors
    if (q.includes("top vendors")) {
      const [rows] = await db.query('SELECT name FROM vendors ORDER BY rating DESC LIMIT 5');
      const answer = rows.length
        ? rows.map(r => r.name).join(', ')
        : "No vendors found.";
      return res.json({ answer });
    }

    // Intent 3: Search for a specific product (fallback keyword search)
    const keywords = q.split(' ').filter(word => word.length > 2);
    if (keywords.length > 0) {
      const likeQueries = keywords.map(word => `name LIKE '%${word}%'`).join(' OR ');
      const [rows] = await db.query(`SELECT name, price FROM products WHERE ${likeQueries} LIMIT 5`);
      const answer = rows.length
        ? rows.map(r => `${r.name} - ₹${r.price}`).join('\n')
        : "❌ No products matched your query.";
      return res.json({ answer });
    }

    // Default fallback
    return res.json({
      answer: "🤖 I didn’t understand that. Try asking about products, vendors, or orders."
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({ answer: '🚨 Server error processing your query.' });
  }
});

module.exports = router;
