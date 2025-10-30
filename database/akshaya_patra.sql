CREATE DATABASE IF NOT EXISTS akshaya_patra;
USE akshaya_patra;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    aadhaar VARCHAR(12) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('citizen', 'dealer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ration cards table
CREATE TABLE ration_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    card_no VARCHAR(20) UNIQUE NOT NULL,
    user_id INT,
    family_members INT,
    category ENUM('APL', 'BPL'),
    address TEXT,
    phone VARCHAR(15),
    rice DECIMAL(10,2),
    wheat DECIMAL(10,2),
    sugar DECIMAL(10,2),
    oil DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Stock table
CREATE TABLE stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_type ENUM('rice', 'wheat', 'sugar', 'oil') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit ENUM('kg', 'L') NOT NULL,
    location ENUM('system', 'dealer') NOT NULL,
    dealer_id INT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dealer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Requests table
CREATE TABLE requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dealer_id INT,
    item_type ENUM('rice', 'wheat', 'sugar', 'oil') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    FOREIGN KEY (dealer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Distributions table
CREATE TABLE distributions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    card_no VARCHAR(20),
    dealer_id INT,
    rice DECIMAL(10,2),
    wheat DECIMAL(10,2),
    sugar DECIMAL(10,2),
    oil DECIMAL(10,2),
    distributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_no) REFERENCES ration_cards(card_no),
    FOREIGN KEY (dealer_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (fullname, aadhaar, email, password, user_type) VALUES
-- Citizens
('Gopal Krishnan', '001122334455', 'gopal@test.com', '$2b$10$password123', 'citizen'),
('Sita Devi', '002233445566', 'sita@test.com', '$2b$10$password123', 'citizen'),
('Ravi Teja', '003344556677', 'ravi@test.com', '$2b$10$password123', 'citizen'),
('Lakshmi Bai', '004455667788', 'lakshmi@test.com', '$2b$10$password123', 'citizen'),
('Arun Varma', '005566778899', 'arun@test.com', '$2b$10$password123', 'citizen'),

-- Dealers
('Amit Kumar', '999000111222', 'dealer@demo.com', '$2b$10$password123', 'dealer'),
('Priya Sharma', '999000111223', 'dealer2@demo.com', '$2b$10$password123', 'dealer'),

-- Admin
('State Admin', '999000222333', 'admin@demo.com', '$2b$10$password123', 'admin');

-- Insert ration cards
INSERT INTO ration_cards (card_no, user_id, family_members, category, address, phone, rice, wheat, sugar, oil) VALUES
('RC001APL7890', 1, 4, 'APL', '12/A, Gandhi Nagar, Main Road, Cityville', '9876543210', 10, 8, 2, 1),
('RC002BPL1234', 2, 6, 'BPL', '45-B, Shastri Colony, Near Bus Stand, Townsville', '9000111222', 25, 15, 3, 2),
('RC003APL5678', 3, 2, 'APL', 'Flat 301, High Rise Apts, Tech Park Area', '9567890123', 5, 4, 1, 0),
('RC004BPL9012', 4, 7, 'BPL', 'House 8, Labour Camp, Industrial Zone, Suburbia', '9123456789', 30, 20, 4, 3),
('RC005APL3456', 5, 5, 'APL', 'Village Road, Post Office Lane, Countryside', '9789012345', 12, 10, 2, 1);

-- Insert system stock
INSERT INTO stock (item_type, quantity, unit, location) VALUES
('rice', 15000, 'kg', 'system'),
('wheat', 22000, 'kg', 'system'),
('sugar', 8000, 'kg', 'system'),
('oil', 6500, 'L', 'system');

-- Insert dealer stock
INSERT INTO stock (item_type, quantity, unit, location, dealer_id) VALUES
('rice', 150, 'kg', 'dealer', 6),
('wheat', 200, 'kg', 'dealer', 6),
('sugar', 0, 'kg', 'dealer', 6),
('oil', 50, 'L', 'dealer', 6);
