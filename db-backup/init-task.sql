-- Create schema for task microservice
CREATE SCHEMA IF NOT EXISTS task AUTHORIZATION admin;

-- Create enum type for task status
CREATE TYPE task.task_status 
    AS ENUM ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'PAUSED', 'REJECTED');

-- Create sequence for task IDs
CREATE SEQUENCE task.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE task.tasks_id_seq OWNER TO admin;

-- Create tasks table in task schema
CREATE TABLE task.tasks (
    id integer NOT NULL DEFAULT nextval('task.tasks_id_seq'::regclass),
    description character varying(150) NOT NULL,
    assignee_id integer,
    status task.task_status NOT NULL,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_assignee_fkey FOREIGN KEY (assignee_id) REFERENCES "user".users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

ALTER TABLE task.tasks OWNER TO admin;

-- Insert sample data into tasks table
INSERT INTO task.tasks (id, description, assignee_id, status) VALUES
(1, 'Refactor authentication logic for clarity and reuse', 1, 'IN_PROGRESS'),
(2, 'Write unit tests for API endpoints', 1, 'DONE'),
(3, 'Migrate hardcoded properties to config file', 2, 'DONE'),
(4, 'Implement loading spinner for async operations', 3, 'IN_PROGRESS'),
(5, 'Prepare the app for multilingual support', 4, 'PAUSED'),
(6, 'Deploy the Dockerized application to Render', 2, 'IN_REVIEW'),
(7, 'Create inline manual synchronized with current view', 2, 'IN_PROGRESS'),
(8, 'Design dashboard with user and task statuses, and assignments', 3, 'IN_PROGRESS'),
(9, 'Implement localStorage persistence for user-defined filters', 1, 'REJECTED'),
(10, 'Introduce role-based access control for admin-only operations', NULL, 'TODO');

-- Set current value of task ID sequence
SELECT pg_catalog.setval('task.tasks_id_seq', 10, true);
