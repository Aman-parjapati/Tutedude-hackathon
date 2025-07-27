
import React from 'react';

export default function Order({ cartItems }) {
    if (!cartItems || cartItems.length === 0) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>Your Cart</h2>
                <p>Your cart is empty. Add some products from the marketplace!</p>
            </div>
        );
    }

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.count), 0);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Your Orders</h2>
            
            <div style={{ marginTop: '2rem' }}>
                {cartItems.map(item => (
                    <div key={item.id} style={{ 
                        border: '1px solid #ccc', 
                        padding: '1rem', 
                        marginBottom: '1rem', 
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h4>{item.name}</h4>
                        <p><strong>Supplier:</strong> {item.supplier_name || 'Unknown'}</p>
                        <p><strong>Price:</strong> ₹{item.price} each</p>
                        <p><strong>Quantity:</strong> {item.count}</p>
                        <p><strong>Total:</strong> ₹{item.price * item.count}</p>
                    </div>
                ))}
            </div>
            
            <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                backgroundColor: '#e8f4f8', 
                borderRadius: '8px',
                textAlign: 'right'
            }}>
                <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
                <button style={{ 
                    padding: '0.75rem 2rem', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}>
                    Place Order
                </button>
            </div>
        </div>
    );
}