-- Create schema for user microservice
CREATE SCHEMA IF NOT EXISTS "user" AUTHORIZATION admin;

-- Create enum type for user status
CREATE TYPE "user".user_status AS ENUM ('ACTIVE', 'BLOCKED');

-- Create sequence for user IDs
CREATE SEQUENCE "user".users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "user".users_id_seq OWNER TO admin;

-- Create users table in user schema
CREATE TABLE "user".users (
    id integer NOT NULL DEFAULT nextval('"user".users_id_seq'::regclass),
    full_name character varying(50) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    is_admin boolean NOT NULL,
    status "user".user_status NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_unique UNIQUE (username)
);

ALTER TABLE "user".users OWNER TO admin;

-- Insert sample data into users table
INSERT INTO "user".users (id, full_name, username, password, is_admin, status) VALUES
(1, 'Administrator', 'admin', 'admin', true, 'ACTIVE'),
(2, 'Alessandro De Prato', 'aledep', 'aledep', false, 'ACTIVE'),
(3, 'Gabriela Belmani', 'gabri', 'gabri', false, 'ACTIVE'),
(4, 'Martina Damiani', 'marty', 'marty', false, 'BLOCKED');

-- Set current value of user ID sequence
SELECT pg_catalog.setval('"user".users_id_seq', 4, true);
