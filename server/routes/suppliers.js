// server/routes/suppliers.js
const express = require('express');
const router = express.Router();
const { getSuppliers } = require('../controllers/productController');

// GET /api/suppliers
router.get('/', getSuppliers);

module.exports = router;
