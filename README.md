# TodoList

A full-stack task management app built with AngularJS and ASP.NET Core.  
Implements dual-mode filtering: server-driven by default, with optional client-side control via Redux Classic.

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

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | AngularJS 1.x, Bootstrap 5     |
| State Mgmt   | Redux Classic (ng-redux)       |
| Backend      | ASP.NET Core 8.0 (Web API)     |
| Language     | C#                             |
| Build Tools  | .NET CLI, npm                  |

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js + npm](https://nodejs.org/)

### Run the backend

```bash
cd TodoListServerC#
dotnet run
```
