FROM postgres:16

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=todolist

# Copies the SQL dump into the docker-entrypoint-initdb.d folder
# This ensures it gets run automatically on first container start
COPY init.sql /docker-entrypoint-initdb.d/