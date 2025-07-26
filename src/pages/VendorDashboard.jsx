import React, { useState } from 'react';
import ProductUploadForm from '../component/ProductUploadForm';

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const vendorName = localStorage.getItem('vendorName');

  const handleUpload = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h2>Welcome, {vendorName}</h2>
      <ProductUploadForm onUpload={handleUpload} />
      
      <h3>Your Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}