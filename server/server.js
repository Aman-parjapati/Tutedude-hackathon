const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { getSuppliers } = require('./controllers/productController'); // ✅ MISSING IMPORT - This was the issue!

const app = express();

/* CORS – allow Vite on :5173 */
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ new, self-contained suppliers router
const suppliersRouter = express.Router();
suppliersRouter.get('/', getSuppliers); // GET /api/suppliers → suppliers
app.use('/api/suppliers', suppliersRouter);

/* Express 5-safe catch-all */
app.use((req, res) => res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
}));

app.listen(process.env.PORT || 5000, () => console.log('API listening on 5000'));