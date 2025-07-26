import React, { useState } from 'react';

export default function ProductUploadForm({ onUpload }) {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.price) {
      onUpload({ ...product, id: Date.now() });
      setProduct({ name: '', price: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        required
      />
      <button type="submit">Upload Product</button>
    </form>
  );
}
