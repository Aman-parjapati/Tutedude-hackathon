import React, { useState, useEffect } from 'react';

export default function ProductUploadForm({ onUpload }) {
    const [product, setProduct] = useState({ name: '', price: '', supplier_id: '' });
    const [loading, setLoading] = useState(false);

    // Get current supplier from localStorage
    useEffect(() => {
        const supplier = JSON.parse(localStorage.getItem('supplier') || '{}');
        if (supplier.id) {
            setProduct(prev => ({ ...prev, supplier_id: supplier.id }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.name && product.price && product.supplier_id) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(product),
                });
                
                if (response.ok) {
                    const responseData = await response.json();
                    onUpload({ 
                        ...product, 
                        id: responseData.productId
                    });
                    setProduct({ name: '', price: '', supplier_id: product.supplier_id });
                    alert('Product uploaded successfully!');
                } else {
                    const errorData = await response.json();
                    alert('Failed to upload product: ' + errorData.message);
                }
            } catch (error) {
                console.error('Product upload error:', error);
                alert('An error occurred while uploading.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h3>Upload New Product</h3>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                    style={{ 
                        padding: '0.5rem', 
                        marginRight: '0.5rem', 
                        borderRadius: '4px', 
                        width: '200px' 
                    }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                    style={{ 
                        padding: '0.5rem', 
                        marginRight: '0.5rem', 
                        borderRadius: '4px', 
                        width: '100px' 
                    }}
                />
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: '0.5rem 1rem', 
                        borderRadius: '4px', 
                        backgroundColor: loading ? '#ccc' : '#007bff', 
                        color: 'white', 
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Uploading...' : 'Upload Product'}
                </button>
            </div>
            <small style={{ color: '#666' }}>
                Products will be associated with your supplier account
            </small>
        </form>
    );
}
