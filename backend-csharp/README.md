# 🧾 ToDoList — Backend C# (.NET 8.0)

A RESTful API for task and user management, built with ASP.NET Core and Entity Framework.

## 🌐 Live Version

The project is available on Render at: 👉 https://todolist-be-csharp.onrender.com

## 🧩 Features

- ✅ Create, update, delete tasks and users
- 🔍 Filter tasks and users by multiple criteria
- 👥 Assign tasks to users
- 🧠 Entity Framework with PostgreSQL
- 🔐 HTTPS support with dev certificate
- 🧪 Tested on .NET 8.0

## Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Backend   | ASP.NET Core (.NET 8.0) |
| ORM       | Entity Framework Core   |
| Database  | PostgreSQL              |
| Container | Docker                  |

<a name="installation-and-launch"></a>

## 🚀 Installation & Launch

### 🐳 Using Docker

Use Docker Desktop or run the API locally with:

```
docker build -t todolist-be-csharp .
docker run -p 5001:5000 todolist-be-csharp
```

Then access the API at: 📍 https://localhost:5001

Built-in client at: 📍 https://localhost:5001/swagger

### 🧰 Using Visual Studio

To run the backend with Visual Studio:

1. Open the solution file TodoList.sln in Visual Studio.
2. In the toolbar, locate the green play button next to the project name TodoList.
3. Click the play button to launch the backend API.

The API will start and be accessible at: 📍 https://localhost:5000

Swagger UI will be available at: 📍 https://localhost:5000/swagger

### ⚙️ Configuration

The API uses the following environment configuration:

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db;Port=5432;Database=todolist;Username=admin;Password=admin"
  }
}
```

HTTPS certificate: https/aspnet-dev.pfx

## 📌 General Notes

- ✔ Compatible with .NET 8.0
- ✔ Uses HTTPS with local certificate or HTTP under proxy
- ✔ Dockerfile includes build and runtime stages
- ✔ PostgreSQL connection via environment config

## 📁 Project Structure

```
└── appsettings.Development.json
└── appsettings.Docker.json
└── appsettings.json
├── Controllers
│   └── HealthController.cs
│   └── TaskController.cs
│   └── UserController.cs
└── Dockerfile
├── DTOs
│   └── TaskFilterDto.cs
│   └── UserFilterDto.cs
├── https
│   └── aspnet-dev.pfx
├── Models
│   └── Task.cs
│   └── TodoListContext.cs
│   └── User.cs
└── Program.cs
├── Properties
│   └── launchSettings.json
└── README.md
└── TodoList.csproj
└── TodoList.csproj.user
└── TodoList.http
└── TodoList.sln
├── Utils
│   └── RoutePrefixConvention .cs
├── wwwroot
│   └── index.html

📊 Tree Summary
📁 Folders: 7
📄 Files: 22
```

## 🔗 Related Documentation

📖 See [Main README](../README.md) for global setup and shared scripts.
