import React from 'react';

export default function Home() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to Tutedude</h1>
            <p>Empowering street food vendors with easy access to raw materials.</p>
            
            <div style={{ marginTop: '2rem' }}>
                <h2>How it works:</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
                    <div>
                        <h3>For Vendors</h3>
                        <p>Browse our marketplace to find quality raw materials from trusted suppliers at competitive prices.</p>
                    </div>
                    <div>
                        <h3>For Suppliers</h3>
                        <p>List your products and connect directly with vendors who need your raw materials.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

