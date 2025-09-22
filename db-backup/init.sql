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
-- Name: Task; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Task" (
    id integer NOT NULL,
    description character varying(150) NOT NULL,
    "assigneeId" integer,
    status character varying(12) DEFAULT 'TODO'::character varying
);

ALTER TABLE public."Task" OWNER TO admin;

--
-- Name: Task_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Task_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."Task_id_seq" OWNER TO admin;

--
-- Name: Task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Task_id_seq" OWNED BY public."Task".id;

--
-- Name: User; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "fullName" character varying(50),
    username character varying(10) NOT NULL,
    password character varying(10) NOT NULL,
    "isAdmin" boolean DEFAULT false,
    status character varying(20) NOT NULL
);

ALTER TABLE public."User" OWNER TO admin;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public."User_id_seq" OWNER TO admin;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;

--
-- Name: Task id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Task"
    ALTER COLUMN id SET DEFAULT nextval('public."Task_id_seq"'::regclass);

--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);

--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Task" (id, description, "assigneeId", status) FROM stdin;
1	Refactor authentication logic for clarity and reuse	1	TODO
2	Write unit tests for API endpoints	1	IN PROGRESS
64	Migrate hardcoded properties to config file	1	TODO
69	Implement loading spinner for async operations	3	IN PROGRESS
117	Prepare the app for multilingual support	3	DONE
121	Deploy the Dockerized application to Render	2	IN PROGRESS
\.

    

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."User" (id, "fullName", username, password, "isAdmin", status) FROM stdin;
1	Amministratore	admin	qcchb1001	true	ACTIVE
2	Alessandro De Prato	aldep	aldep	false	ACTIVE
3	Gabriela Belmani	gabri	gabri	false	ACTIVE
4	Martina Damiani	marty	marty	false	BLOCKED
\.


--
-- Name: Task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Task_id_seq"', 121, true);

--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);

--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);

--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);

--
-- Name: Task FK_Task_User; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "FK_Task_User" FOREIGN KEY ("assigneeId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;

--
-- PostgreSQL database dump complete
--
