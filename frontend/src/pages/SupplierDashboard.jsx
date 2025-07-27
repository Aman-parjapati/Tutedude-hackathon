import React, { useState, useEffect } from 'react';
import ProductUploadForm from '../component/ProductUploadForm';

export default function SupplierDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const supplier = JSON.parse(localStorage.getItem('supplier') || '{}');

    // Fetch supplier's products from API on component load
    useEffect(() => {
        const fetchSupplierProducts = async () => {
            if (!supplier.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/products/supplier/${supplier.id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error('Failed to fetch supplier products:', error);
                alert('Could not load your products from the server.');
            } finally {
                setLoading(false);
            }
        };

        fetchSupplierProducts();
    }, [supplier.id]);

    const handleUpload = (newProduct) => {
        // Add new product to existing list instead of replacing
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };

    if (loading) {
        return <div><h2>Loading your products...</h2></div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Welcome, {supplier.name || 'Supplier'}!</h2>
            <p>Manage your products and inventory here.</p>
            
            <ProductUploadForm onUpload={handleUpload} />
            
            <h3>Your Products ({products.length})</h3>
            {products.length === 0 ? (
                <p>No products uploaded yet.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem' 
                }}>
                    {products.map(product => (
                        <div key={product.id} style={{ 
                            border: '1px solid #ccc', 
                            padding: '1rem', 
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h4>{product.name}</h4>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                            <small style={{ color: '#666' }}>
                                Product ID: {product.id}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
