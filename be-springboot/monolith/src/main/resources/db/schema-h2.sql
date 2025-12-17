CREATE SCHEMA IF NOT EXISTS public;

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS public.tasks;
DROP TABLE IF EXISTS public.users;

-- Create users table with auto-increment primary key
CREATE TABLE public.users
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    username  VARCHAR(50)  NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    is_admin  BOOLEAN      NOT NULL DEFAULT FALSE,
    status    VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE'
);

-- Create tasks table with auto-increment primary key and foreign key to users
CREATE TABLE public.tasks
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(150) NOT NULL,
    assignee_id INT,
    status      VARCHAR(20),
    CONSTRAINT fk_assignee FOREIGN KEY (assignee_id) REFERENCES public.users (id) ON UPDATE CASCADE ON DELETE SET NULL
);
