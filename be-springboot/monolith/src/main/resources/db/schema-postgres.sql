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

-- Create sequence for tasks table primary key if it does not exist
CREATE SEQUENCE IF NOT EXISTS task.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create sequence for users table primary key if it does not exist
CREATE SEQUENCE IF NOT EXISTS "user".user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Set ownership of sequences to the respective table columns
ALTER SEQUENCE "user".user_id_seq OWNED BY "user".users.id;
ALTER SEQUENCE task.task_id_seq OWNED BY task.tasks.id;

-- Create users table if it does not exist
CREATE TABLE IF NOT EXISTS "user".users
(
    id        integer      NOT NULL DEFAULT nextval('"user".user_id_seq'::regclass),
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
    id          integer      NOT NULL DEFAULT nextval('task.task_id_seq'::regclass),
    description VARCHAR(150) NOT NULL,
    assignee_id integer,
    status      task.task_status,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT task_assignee_fk FOREIGN KEY (assignee_id) REFERENCES "user".users (id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Optionally set initial sequence values based on existing data
SELECT pg_catalog.setval('task.task_id_seq', 10, true);
SELECT pg_catalog.setval('"user".user_id_seq', 4, true);
