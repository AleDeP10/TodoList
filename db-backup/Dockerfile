FROM postgres:16

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=todolist

# Copies the SQL dump into the docker-entrypoint-initdb.d folder
# This ensures it gets run automatically on first container start
COPY 01-init-monolith.sql /docker-entrypoint-initdb.d/
COPY 02-init-user.sql /docker-entrypoint-initdb.d/
COPY 03-init-task.sql /docker-entrypoint-initdb.d/

COPY custom-entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /usr/local/bin/custom-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/custom-entrypoint.sh"]
