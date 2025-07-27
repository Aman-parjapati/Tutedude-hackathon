# Tutedude Supplier-Vendor Platform

A platform connecting suppliers and vendors for raw materials trading.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL

### Database Setup
```sql
CREATE DATABASE supplier_vendor;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE vendor (
    receiver_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE supplier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20),
    address TEXT
);
```

### Backend Setup
1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create .env file:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=supplier_vendor
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Features
- Supplier registration and login
- Vendor registration and login
- Product management for suppliers
- Marketplace for vendors
- Order management

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL