-- Create schema for task microservice
CREATE SCHEMA IF NOT EXISTS task AUTHORIZATION admin;

-- Create enum type for task status
CREATE TYPE task.task_status 
    AS ENUM ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'PAUSED', 'REJECTED', 'BACKLOG');

-- Create tasks table in task schema
CREATE TABLE task.tasks
(
    id          UUID         NOT NULL DEFAULT uuid_generate_v4(),
    description VARCHAR(150) NOT NULL,
    assignee_id UUID,
    status      task.task_status,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT task_assignee_fk FOREIGN KEY (assignee_id) REFERENCES "user".users (id)
        ON UPDATE CASCADE ON DELETE NO ACTION
);

ALTER TABLE task.tasks OWNER TO admin;

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
