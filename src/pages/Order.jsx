import React from 'react';

export default function Order({ cartItems }) {
  if (cartItems.length === 0) return null;

  return (
    <div className="orders-container">
      <h2>🧾 Orders</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle}>Product Name</th>
            <th style={thStyle}>Price (₹)</th>
            <th style={thStyle}>Count</th>
            <th style={thStyle}>Total Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>₹{item.price}</td>
              <td style={tdStyle}>{item.count}</td>
              <td style={tdStyle}>₹{item.price * item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};
