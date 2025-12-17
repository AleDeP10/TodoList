--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10
-- Dumped by pg_dump version 15.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    description character varying(150) NOT NULL,
    assignee_id integer,
    status character varying(15)
);


ALTER TABLE public.tasks OWNER TO admin;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO admin;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."users" (
    id integer NOT NULL,
    full_name character varying(50) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    is_admin boolean NOT NULL,
    status character varying(15) NOT NULL
);


ALTER TABLE public."users" OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public."users".id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."users" ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.tasks (id, description, assignee_id, status) VALUES
(1, 'Refactor authentication logic for clarity and reuse', 1, 'IN_PROGRESS'),
(2, 'Write unit tests for API endpoints', 1, 'DONE'),
(3, 'Migrate hardcoded properties to config file', 2, 'DONE'),
(4, 'Implement loading spinner for async operations', 3, 'IN_PROGRESS'),
(5, 'Prepare the app for multilingual support', 4, 'PAUSED'),
(6, 'Deploy the Dockerized application to Render', 2, 'PAUSED'),
(7, 'Create inline manual synchronized with current view', 2, 'IN_PROGRESS'),
(8, 'Design dashboard with user and task statuses, and assignments', 3, 'IN_PROGRESS'),
(9, 'Implement localStorage persistence for user-defined filters', NULL, 'TODO'),
(10, 'Introduce role-based access control for admin-only operations', NULL, 'TODO');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."users" (id, full_name, username, password, is_admin, status) VALUES
(1, 'Administrator', 'admin', 'admin', TRUE, 'ACTIVE'),
(2, 'Alessandro De Prato', 'aledep', 'aledep', FALSE, 'ACTIVE'),
(3, 'Gabriela Belmani', 'gabri', 'gabri', FALSE, 'ACTIVE'),
(4, 'Martina Damiani', 'marty', 'marty', FALSE, 'BLOCKED');



--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tasks_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: tasks task_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."users"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users user_username; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."users"
    ADD CONSTRAINT user_username UNIQUE (username);


--
-- Name: tasks task_assignee; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT task_assignee FOREIGN KEY (assignee_id) REFERENCES public."users"(id) ON UPDATE CASCADE ON DELETE NO ACTION NOT VALID;


--
-- PostgreSQL database dump complete
--

