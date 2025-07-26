import React, { useState } from 'react';

export default function Marketplace({ cart, setCart }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Steel Rods', price: 120 },
    { id: 2, name: 'Copper Wire', price: 80 },
    { id: 3, name: 'Plastic Sheets', price: 50 },
    { id: 4, name: 'Aluminum Plates', price: 100 },
    { id: 5, name: 'Rubber Tires', price: 60 },
    { id: 6, name: 'Glass Panels', price: 90 },
    { id: 7, name: 'Wood Planks', price: 110 },
    { id: 8, name: 'Textile Rolls', price: 70 },
    { id: 9, name: 'Ceramic Tiles', price: 95 },
    { id: 10, name: 'Paint Buckets', price: 130 },
    { id: 11, name: 'Chemical Barrels', price: 200 },
    { id: 12, name: 'Leather Sheets', price: 75 },
    { id: 13, name: 'Paper Reels', price: 40 },
    { id: 14, name: 'Oil Drums', price: 160 },
  ]);

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
  alert(`Ordered: ${product.name}`);
};

  return (
    <div className="marketplace-container">
      <h2>Marketplace</h2>
      <p>Browse and order raw materials from trusted vendors.</p>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => handleOrder(product)}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}
