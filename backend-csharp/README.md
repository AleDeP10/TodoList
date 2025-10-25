# 🧾 ToDoList — Backend C# (.NET 8.0)

A RESTful API for task and user management, built with ASP.NET Core and Entity Framework.

## 🌐 Live Version

The project is available on Render at: 👉 https://todolist-be-csharp.onrender.com

## 🧩 Features

- ✍️ Create, update, delete tasks and users
- 🔍 Filter tasks and users by multiple criteria
- 🤝 Assign tasks to users
- 🗄️ Entity Framework with PostgreSQL
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

The backend API depends on a PostgreSQL database container (todolist-db) to function properly. 

To run the full ecosystem seamlessly, navigate to the root folder of the ToDoList project (which contains the docker-compose.yml file) and run:

```
docker compose up --build
```

This will build and start all required containers, including the database and backend API.

API will be accessible at: 📍 http://localhost:5001/api

Built-in client at: 📍 http://localhost:5001/swagger

### 🧰 Using Visual Studio

To run the backend with Visual Studio:

1. Open the solution file TodoList.sln in Visual Studio.
2. In the toolbar, locate the green play button next to the project name TodoList.
3. Click the play button to launch the backend API.

The API will start and be accessible at: 📍 http://localhost:5000

Swagger UI will be available at: 📍 http://localhost:5000/swagger

### ⚙️ Configuration

The file `appsettings.Development.json` containing the database configuration is not included in the repository.

To run the backend successfully, you need to create this file with the following structure:

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db;Port=5432;Database=todolist;Username=admin;Password=admin"
  }
}
```

Make sure to adapt the `Username` and `Password` values to match your local database credentials.

## 📌 General Notes

- ✔ Compatible with .NET 8.0
- ✔ Dockerfile includes build and runtime stages
- ✔ PostgreSQL connection via environment config
- ✔ Project includes Visual Studio configuration for immediate use
- ✔ Database todolist is required and must be running for the backend to function properly

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
