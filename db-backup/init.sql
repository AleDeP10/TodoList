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
-- Name: task; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.task (
    id integer NOT NULL,
    description character varying(150) NOT NULL,
    assignee_id integer,
    status character varying(15)
);


ALTER TABLE public.task OWNER TO admin;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO admin;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    full_name character varying(50) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    is_admin boolean NOT NULL,
    status character varying(15) NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.task (id, description, assignee_id, status) FROM stdin;
1	Refactor authentication logic for clarity and reuse	1	IN PROGRESS
2	Write unit tests for API endpoints	1	DONE
3	Migrate hardcoded properties to config file	2	DONE
4	Implement loading spinner for async operations	3	IN PROGRESS
5	Prepare the app for multilingual support	4	PAUSED
6	Deploy the Dockerized application to Render	2	PAUSED
7	Create inline manual synchronized with current view	2	IN PROGRESS
8	Design dashboard with user and task statuses, and assignments	3	IN PROGRESS
9	Implement localStorage persistence for user-defined filters	\N	TODO
10	Introduce role-based access control for admin-only operations	\N	TODO
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, full_name, username, password, is_admin, status) FROM stdin;
1	Administrator	admin	admin	t	ACTIVE
2	Alessandro De Prato	aledep	aledep	f	ACTIVE
3	Gabriela Belmani	gabri	gabri	f	ACTIVE
4	Martina Damiani	marty	marty	f	BLOCKED
\.


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.task_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username UNIQUE (username);


--
-- Name: task task_assignee; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_assignee FOREIGN KEY (assignee_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- PostgreSQL database dump complete
--

