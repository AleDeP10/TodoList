# 🗄️ ToDoList — DB Backup

This folder contains the PostgreSQL initialization files used to bootstrap the database for the ToDoList project.

## 🧬 Database Structure

The schema includes two main entities:

- **User**
  - `id`: primary key, auto-incremented
  - `fullName`, `username`, `password`, `isAdmin`, `status`
- **Task**
  - `id`: primary key, auto-incremented
  - `description`, `assigneeId` (foreign key to `User`), `status`,

Additional features:

- Sequences for auto-increment (`User_id_seq`, `Task_id_seq`)
- Foreign key constraint: `Task.assigneeId → User.id`
- Default values and initial data for both tables

<a name="restore-instructions"></a>

## ♻️ Restore Instructions

### 🐳 Using Docker

For the ToDoList projects to operate correctly on Docker, it is essential that the database is installed and running inside the todolist-db container.

To run the full ecosystem seamlessly, navigate to the root folder of the ToDoList project (which contains the docker-compose.yml file) and run:

```
docker compose up --build
```

This will:

- Start a PostgreSQL 16 container
- Automatically execute init.sql on first launch
- Create the schema and populate initial data

### 🧪 Local Setup (No Docker)

For developers who prefer a direct local setup without containers:

1. **Install PostgreSQL 16**

   Use your system’s package manager or installer from postgresql.org

2. **Create the database manually**

```
createdb -U admin todolist
```

3. **Run the SQL dump**

```
psql -U admin -d todolist -f ./db-backup/init.sql
```

4. **Verify the data**

   You can inspect the tables using:

```
psql -U admin -d todolist
   SELECT * FROM "User";
```

5. **Configure your backend**

   Ensure your .env or config file points to:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=todolist
```

Optional: use pgAdmin or TablePlus for GUI-based inspection.

## 🐳 Docker Notes

The Dockerfile uses the official postgres:16 image

The SQL dump is copied into `/docker-entrypoint-initdb.d/`, which ensures automatic execution on container startup

Default credentials:

- POSTGRES_USER=admin
- POSTGRES_PASSWORD=admin
- POSTGRES_DB=todolist

Make sure port 5432 is available locally before running the container.
