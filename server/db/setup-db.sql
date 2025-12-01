DROP DATABASE IF EXISTS jupiter_clients;
CREATE DATABASE jupiter_clients;

DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    title VARCHAR(5),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT,
    city TEXT,
    post_code TEXT
);

