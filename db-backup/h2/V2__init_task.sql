-- Create schema if it does not exist
CREATE SCHEMA IF NOT EXISTS task;

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS task.tasks;

-- Create tasks table with auto-increment primary key and foreign key to users
CREATE TABLE task.tasks
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(150) NOT NULL,
    assignee_id INT,
    status      VARCHAR(20),
    CONSTRAINT fk_assignee FOREIGN KEY (assignee_id) REFERENCES "user".users (id) ON UPDATE CASCADE ON DELETE SET NULL
);
