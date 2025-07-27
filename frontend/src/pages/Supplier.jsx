import React, { useState, useEffect } from 'react';

export default function Supplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/suppliers');
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('Fetched suppliers:', data); // Debug log
                setSuppliers(data.suppliers || []);
            } catch (error) {
                console.error('Failed to fetch suppliers:', error);
                alert('Could not load suppliers from the server.');
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Loading suppliers...</h2>
            </div>
        );
    }

    return (
        <div className="supplier-directory">
            <h2>Supplier Directory</h2>
            <p>Find trusted suppliers for your raw material needs</p>
            
            {suppliers.length === 0 ? (
                <p>No suppliers registered yet.</p>
            ) : (
                <div className="suppliers-grid">
                    {suppliers.map(supplier => (
                        <div key={supplier.id} className="supplier-card">
                            <h3>🛒 {supplier.name}</h3>
                            <div className="supplier-details">
                                <p><strong>Address:</strong> {supplier.address || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {supplier.phone || 'Not provided'}</p>
                                <p><strong>Email:</strong> {supplier.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
