# 🧾 TodoList

A full-stack task management app powered by AngularJS, Redux and ASP.NET Core.  
**Fully containerized with HTTPS support out of the box.**

---

## 🧩 Features

- ✅ Create, edit, delete tasks with assigned users and status
- 🔍 Filter tasks by description, status, and assignee
- 🔁 Dual-mode filtering:
  - **Server-side** (default): efficient for large datasets
  - **Client-side**: powered by Redux Classic for responsive UX
- 🎨 Clean, responsive UI with gradient theming and status-aware styling
- 🧠 Modular architecture for easy extension and maintenance

---

## 🛠 Tech Stack

| Layer        | Technology                     |
|-------------|--------------------------------|
| Frontend     | AngularJS 1.x, Bootstrap 5     |
| State Mgmt   | Redux Classic (ng-redux)       |
| Backend      | ASP.NET Core 8.0 (Web API)     |
| Language     | C#                             |
| Build Tools  | .NET CLI, npm, Docker          |

---

## 🚀 Running the App (Docker-first)

### 🐳 Quickstart with Docker Compose

This is the preferred way to run the app locally — secure and self-contained.

```bash
docker-compose up --build
```

Then open the frontend via:

📍 `http://localhost:8080/index.html`  
📡 Backend API via HTTPS: `https://localhost:5001/api/...`

> 🛡 HTTPS is enabled by default in Docker on port 5000 inside the container, mapped to 5001 on your host.  
> The development certificate `aspnet-dev.pfx` is already bundled.

---

## ⚙️ Environment Ports

| Component | Container Port | Host Port | Protocol |
|-----------|----------------|-----------|----------|
| Backend   | 5000           | 5001      | HTTPS    |
| Frontend  | 8080           | 8081      | HTTPS    |

---

## 🧪 Local Dev Setup (non-Docker)

If you're debugging or hate containers:

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js + npm](https://nodejs.org/)
- PostgreSQL (or compatible)

### Database Setup

```bash
psql -U your_user -d todolist -f db-backup/todolist.sql
```

### Start Backend

```bash
cd backend-csharp
dotnet run
```

By default, it listens on HTTPS port 5000 using the dev certificate.

### Start Frontend

```bash
cd frontend-angular
npm install
npm run start
```

Open: [http://127.0.0.1:8080/index.html](http://127.0.0.1:8080/index.html)

---

## 🧾 Notes

- ✔ The ASP.NET backend auto-detects `Docker` environment for specific behavior.
- ✔ Logging on startup will show the active HTTPS port.
- 🔐 Don’t use the dev certificate in production.
- 📄 See `docker-compose.yml` and `Program.cs` for full HTTPS setup.