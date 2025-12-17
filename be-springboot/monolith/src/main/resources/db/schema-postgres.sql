-- Enable uuid-ossp extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create schemas if missing
CREATE SCHEMA IF NOT EXISTS "user";
CREATE SCHEMA IF NOT EXISTS task;

-- Create enum type for user status if it does not exist
DO
'
    DECLARE
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = ''user_status'') THEN
            CREATE TYPE "user".user_status AS ENUM (''ACTIVE'', ''BLOCKED'');
        END IF;
    END;
';

-- Create enum type for task status if it does not exist
DO
'
    DECLARE
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = ''task_status'') THEN
            CREATE TYPE task.task_status AS ENUM (''TODO'', ''IN_PROGRESS'', ''IN_REVIEW'', ''DONE'', ''PAUSED'', ''REJECTED'', ''BACKLOG'');
        END IF;
    END;
';

-- Create users table if it does not exist
CREATE TABLE IF NOT EXISTS "user".users
(
    id        UUID         NOT NULL DEFAULT uuid_generate_v4(),
    username  VARCHAR(50)  NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    is_admin  BOOLEAN      NOT NULL DEFAULT FALSE,
    status    "user".user_status,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- Create tasks table if it does not exist
CREATE TABLE IF NOT EXISTS task.tasks
(
    id          UUID         NOT NULL DEFAULT uuid_generate_v4(),
    description VARCHAR(150) NOT NULL,
    assignee_id UUID,
    status      task.task_status,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT task_assignee_fk FOREIGN KEY (assignee_id) REFERENCES "user".users (id)
        ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Insert sample data into users table
INSERT INTO "user".users (id, full_name, username, password, is_admin, status) VALUES
('0d854acd-5aa0-4506-9258-a5067e372fe9', 'Administrator', 'admin', 'admin', true, 'ACTIVE'),
('cb05eb81-4ef4-42ad-945c-f3f0bb34c4d5', 'Alessandro De Prato', 'aledep', 'aledep', false, 'ACTIVE'),
('22f4c91d-be22-40f1-a4c9-9beb1aad17a6', 'Gabriela Belmani', 'gabri', 'gabri', false, 'ACTIVE'),
('f6f53bcc-bf64-43a7-839a-9ef58c0fe51d', 'Martina Damiani', 'marty', 'marty', false, 'BLOCKED');

-- Insert sample data into tasks table
INSERT INTO task.tasks (description, assignee_id, status) VALUES
('Refactor authentication logic for clarity and reuse', '0d854acd-5aa0-4506-9258-a5067e372fe9', 'IN_PROGRESS'),
('Write unit tests for API endpoints', '0d854acd-5aa0-4506-9258-a5067e372fe9', 'DONE'),
('Migrate hardcoded properties to config file', 'cb05eb81-4ef4-42ad-945c-f3f0bb34c4d5', 'DONE'),
('Implement loading spinner for async operations', '22f4c91d-be22-40f1-a4c9-9beb1aad17a6', 'IN_PROGRESS'),
('Prepare the app for multilingual support', 'f6f53bcc-bf64-43a7-839a-9ef58c0fe51d', 'PAUSED'),
('Deploy the Dockerized application to Render', 'cb05eb81-4ef4-42ad-945c-f3f0bb34c4d5', 'IN_REVIEW'),
('Create inline manual synchronized with current view', 'cb05eb81-4ef4-42ad-945c-f3f0bb34c4d5', 'IN_PROGRESS'),
('Design dashboard with user and task statuses, and assignments', '22f4c91d-be22-40f1-a4c9-9beb1aad17a6', 'IN_PROGRESS'),
('Implement localStorage persistence for user-defined filters', '0d854acd-5aa0-4506-9258-a5067e372fe9', 'REJECTED'),
('Introduce role-based access control for admin-only operations', NULL, 'TODO');

-- Verify sample data presence
SELECT * FROM "user".users;
SELECT * FROM "task".tasks;
