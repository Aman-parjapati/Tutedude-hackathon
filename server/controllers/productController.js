const pool = require('../config/db');

// Get all products with supplier information
exports.getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.id, 
                p.product_name as name, 
                p.price,
                s.name as supplier_name,
                s.address as supplier_address,
                s.phone_no as supplier_phone
            FROM products p
            LEFT JOIN supplier s ON p.supplier_id = s.id
            ORDER BY p.id DESC
        `);
        
        res.json({ products: rows });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};

// Get all suppliers (for supplier directory)
exports.getSuppliers = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                id, 
                name, 
                email, 
                phone_no as phone, 
                address
            FROM supplier
            ORDER BY name
        `);
        
        res.json({ suppliers: rows });
    } catch (error) {
        console.error('Get suppliers error:', error);
        res.status(500).json({
            message: 'Failed to fetch suppliers',
            error: error.message
        });
    }
};

// Get products by supplier ID
exports.getSupplierProducts = async (req, res) => {
    try {
        const supplierId = req.params.supplierId;
        
        const [rows] = await pool.query(`
            SELECT 
                p.id, 
                p.product_name as name, 
                p.price,
                p.supplier_id
            FROM products p
            WHERE p.supplier_id = ?
            ORDER BY p.id DESC
        `, [supplierId]);
        
        res.json({ products: rows });
    } catch (error) {
        console.error('Get supplier products error:', error);
        res.status(500).json({
            message: 'Failed to fetch supplier products',
            error: error.message
        });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, supplier_id } = req.body;

        if (!name || !price || !supplier_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO products (product_name, price, supplier_id) VALUES (?, ?, ?)',
            [name, price, supplier_id]
        );
        
        res.status(201).json({
            message: 'Product added successfully',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            message: 'Failed to add product',
            error: error.message
        });
    }
};