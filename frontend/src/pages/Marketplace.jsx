import React, { useState, useEffect } from 'react';
import AiAssistant from '../component/AiAssistant';

export default function Marketplace({ cart, setCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleOrder = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? { ...item, count: item.count + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, count: 1 }]);
        }
        alert(`Ordered: ${product.name} from ${product.supplier_name || 'Unknown Supplier'}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products');
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch products', error);
                alert('Could not load products from the server.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="marketplace-container"><h2>Loading products...</h2></div>;
    }

    return (
        <div className="marketplace-container">
            <h1>Raw Materials Marketplace</h1>
            <p>Browse and order raw materials from trusted suppliers.</p>
            
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.price}</p>
                        
                        {/* Supplier Information */}
                        <div className="supplier-info">
                            <p className="supplier-name">
                                <strong>Supplier:</strong> {product.supplier_name || 'Not Available'}
                            </p>
                            {product.supplier_address && (
                                <p className="supplier-address">
                                    <small>{product.supplier_address}</small>
                                </p>
                            )}
                            {product.supplier_phone && (
                                <p className="supplier-phone">
                                    <small>📞 {product.supplier_phone}</small>
                                </p>
                            )}
                        </div>
                        
                        <button onClick={() => handleOrder(product)}>
                            Order
                        </button>
                    </div>
                ))}
            </div>
            
            {products.length === 0 && (
                <p>No products available at the moment.</p>
            )}
            <AiAssistant/>
        </div>
    );
}
