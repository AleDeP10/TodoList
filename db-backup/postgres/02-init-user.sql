-- Create schema for user microservice
CREATE SCHEMA IF NOT EXISTS "user" AUTHORIZATION admin;

-- Create enum type for user status
CREATE TYPE "user".user_status AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- Create users table in user schema
CREATE TABLE "user".users
(
    id        UUID         NOT NULL DEFAULT uuid_generate_v4(),
    username  VARCHAR(50)  NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    is_admin  BOOLEAN      NOT NULL DEFAULT FALSE,
    status    "user".user_status,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

ALTER TABLE "user".users OWNER TO admin;

-- Insert sample data into users table
INSERT INTO "user".users (id, full_name, username, password, is_admin, status) VALUES
('0d854acd-5aa0-4506-9258-a5067e372fe9', 'Administrator', 'admin', 'admin', true, 'ACTIVE'),
('cb05eb81-4ef4-42ad-945c-f3f0bb34c4d5', 'Alessandro De Prato', 'aledep', 'aledep', false, 'ACTIVE'),
('22f4c91d-be22-40f1-a4c9-9beb1aad17a6', 'Gabriela Belmani', 'gabri', 'gabri', false, 'ACTIVE'),
('f6f53bcc-bf64-43a7-839a-9ef58c0fe51d', 'Martina Damiani', 'marty', 'marty', false, 'BLOCKED');