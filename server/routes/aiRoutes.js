const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/query', async (req, res) => {
    try {
        const { query: userQuery } = req.body;
        
        if (!userQuery) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const userInput = userQuery.toLowerCase().trim();

        // Handle greetings
        if (isGreeting(userInput)) {
            return res.json({ 
                response: "👋 Hello! I'm your AI assistant. I can help you find products and suppliers. Try asking:\n• 'Show me chili products'\n• 'Find suppliers for rice'\n• 'What products are available?'" 
            });
        }

        // Extract keywords for product search
        const keywords = userInput.match(/\w+/g) || [];
        
        if (keywords.length === 0) {
            return res.json({ 
                response: 'Please provide a search term for products. Example: "chili", "rice", "spices"' 
            });
        }

        // Build parameterized query with supplier information
        // Using your ACTUAL database schema: supplier table with name, phone_no, address columns
        const searchConditions = keywords.map(() => 'p.product_name LIKE ?').join(' OR ');
        const searchValues = keywords.map(keyword => `%${keyword}%`);
        
        const sql = `
            SELECT 
                p.product_name, 
                p.price, 
                s.name as supplier_name,
                s.phone_no as supplier_phone,
                s.address as supplier_address
            FROM products p 
            LEFT JOIN supplier s ON p.supplier_id = s.id 
            WHERE ${searchConditions} 
            LIMIT 5
        `;
        
        const [rows] = await db.query(sql, searchValues);

        let response;
        if (rows.length > 0) {
            const productDetails = rows.map(row => {
                let productInfo = `📦 **${row.product_name}** - ₹${row.price}`;
                
                if (row.supplier_name) {
                    productInfo += `\n   📍 Supplier: ${row.supplier_name}`;
                    if (row.supplier_phone) {
                        productInfo += `\n   📞 Contact: ${row.supplier_phone}`;
                    }
                    if (row.supplier_address) {
                        productInfo += `\n   🏠 Address: ${row.supplier_address}`;
                    }
                } else {
                    productInfo += `\n   ⚠️ No supplier information available`;
                }
                return productInfo;
            }).join('\n\n');
            
            response = `Found ${rows.length} product(s):\n\n${productDetails}`;
        } else {
            response = `❌ No products found matching: "${keywords.join(', ')}"\n\n💡 Try searching for: rice, spices, vegetables, or other raw materials.`;
        }

        res.json({ response });

    } catch (error) {
        console.error('AI Route Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Helper function for greetings
function isGreeting(input) {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => input.includes(greeting));
}

module.exports = router;