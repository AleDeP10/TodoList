-- Create schema if it does not exist
CREATE SCHEMA IF NOT EXISTS "user";

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS "user".users;

-- Create users table with auto-increment primary key
CREATE TABLE "user".users
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    username  VARCHAR(50)  NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    is_admin  BOOLEAN      NOT NULL DEFAULT FALSE,
    status    VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE'
);
