# ToDoList Spring Boot Backend

This project is the backend API for the ToDoList application, built with Spring Boot and PostgreSQL. It provides RESTful endpoints for managing users and tasks.

🌐 Live Version

The project is available on Render at: 👉 https://todolist-be-springboot.onrender.com

## 🧩 Features

- ✍️ Create, update, and delete tasks and users
- 🔎 Filter tasks and users by multiple criteria
- 🤝 Assign tasks to users
- 🗄️ Hibernate with PostgreSQL
- 🧪 Test-Driven Development (TDD) approach
- 🚨 Robust error handling including integrity violation management

## Tech Stack

| Layer     | Technology           |
|-----------|----------------------|
| Backend   | SpringBoot (Java 17) |
| ORM       | Hibernate            |
| Database  | PostgreSQL           |
| Testing   | JUnit                |
| Container | Docker               |


<a name="installation-and-launch"></a>

## 🚀 Installation & Launch

### 🐳 Using Docker

The backend API depends on a PostgreSQL database container (todolist-db) to function properly. 

To run the full ecosystem seamlessly, navigate to the root folder of the ToDoList project (which contains the docker-compose.yml file) and run:

```
docker compose up --build
```

This will build and start all required containers, including the database and backend API.

API will be accessible at: 📍 http://localhost:8081/api/

You can use Postman test it using Postman or your favorite client. 

### 🧰 Using IntelliJ IDEA

To run the backend with IntelliJ IDEA:

1. Open the project folder be-springboot/monolith/ in IntelliJ IDEA. The included .idea folder ensures the project is immediately configured and ready to run.
2. Locate the TodoListApplication class in the io.todolist package under src/main/java.
3. Right-click on TodoListApplication and select Run 'TodoListApplication.main()'. Alternatively, use the green play button in the top-right toolbar.

API will be accessible at: 📍 http://localhost:8080/api


### ⚙️ Configuration

The file `application-dev.properties` containing the database configuration is not included in the repository.

To run the backend successfully, you need to create this file with the following structure:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/todolist
spring.datasource.username=admin
spring.datasource.password=admin
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=none
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```
Make sure to adapt the `username` and `password` values to match your local database credentials.

## 🗂️ Postman Collection and Environments
The `postman` folder contains the API test collection and environment configuration files to facilitate testing the backend.

Collections: 
- `postman/collections/ToDoList.json`

Environments: 
- `postman/environments/dev.json`,
- `postman/environments/docker.json`
- `postman/environments/prod.json`

### How to Import in Postman
1. Open Postman.
2. Click on Import in the top-left corner.
3. Select the `ToDoList.json` file from the `postman/collections` folder to import the API collection.
4. Import the desired environment file(s) from the `postman/environments` folder.
5. Select the imported environment from the environment dropdown in Postman.

### Running Tests
1. Use the imported collection to explore and test the API endpoints.
2. Switch environments as needed to test different configurations (e.g., local development or Docker).
3. You can run individual requests or the entire collection using Postman’s runner. 

This setup helps you quickly validate the backend API functionality without manual request crafting.

## 📌 General Notes

- ✔ Compatible with Java 17 and Spring Boot 3.x
- ✔ Dockerfile includes multi-stage build for efficient image size
- ✔ PostgreSQL connection configured via application properties
- ✔ Project includes IntelliJ IDEA configuration for immediate use
- ✔ Test-Driven Development (TDD) approach applied
- ✔ Database todolist is required and must be running for the backend to function properly

## 📁 Project Structure

```
└── Dockerfile
└── pom.xml
├── postman
│   ├── collections
│   │   └── ToDoList.json
│   ├── environments
│   │   └── dev.json
│   │   └── docker.json
│   │   └── prod.json
└── prometheus.yml
└── README.md
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── io
│   │   │   │   ├── todolist
│   │   │   │   │   ├── config
│   │   │   │   │   │   └── TaskConfig.java
│   │   │   │   │   │   └── UserConfig.java
│   │   │   │   │   │   └── WebConfig.java
│   │   │   │   │   ├── controller
│   │   │   │   │   │   └── TaskController.java
│   │   │   │   │   │   └── UserController.java
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── TaskDto.java
│   │   │   │   │   │   └── TaskFilterDto.java
│   │   │   │   │   │   └── UserDto.java
│   │   │   │   │   │   └── UserFilterDto.java
│   │   │   │   │   ├── hibernate
│   │   │   │   │   │   ├── type
│   │   │   │   │   │   │   └── PostgreSQLEnumType.java
│   │   │   │   │   │   │   └── TaskStatusType.java
│   │   │   │   │   │   │   └── UserStatusType.java
│   │   │   │   │   ├── mapper
│   │   │   │   │   │   └── TaskMapper.java
│   │   │   │   │   │   └── TaskMapperImpl.java
│   │   │   │   │   │   └── UserMapper.java
│   │   │   │   │   │   └── UserMapperImpl.java
│   │   │   │   │   ├── model
│   │   │   │   │   │   └── Task.java
│   │   │   │   │   │   └── TaskStatus.java
│   │   │   │   │   │   └── User.java
│   │   │   │   │   │   └── UserStatus.java
│   │   │   │   │   ├── repository
│   │   │   │   │   │   └── TaskRepository.java
│   │   │   │   │   │   └── TaskRepositoryCustom.java
│   │   │   │   │   │   └── TaskRepositoryCustomImpl.java
│   │   │   │   │   │   └── UserRepository.java
│   │   │   │   │   │   └── UserRepositoryCustom.java
│   │   │   │   │   │   └── UserRepositoryCustomImpl.java
│   │   │   │   │   ├── service
│   │   │   │   │   │   └── TaskService.java
│   │   │   │   │   │   └── UserService.java
│   │   │   │   │   └── ToDoListApplication.java
│   │   │   ├── utils
│   │   │   │   └── ProfileUtils.java
│   │   ├── resources
│   │   │   └── application-dev.properties
│   │   │   └── application-docker.properties
│   │   │   └── application.properties
│   │   │   ├── db
│   │   │   │   └── schema-h2.sql
│   │   │   │   └── schema-postgres.sql
│   │   │   │   └── schema.sql
│   ├── test
│   │   ├── java
│   │   │   ├── io
│   │   │   │   ├── todolist
│   │   │   │   │   └── BaseTest.java
│   │   │   │   │   ├── mapper
│   │   │   │   │   │   └── TaskMapperTest.java
│   │   │   │   │   │   └── UserMapperTest.java
│   │   │   │   │   ├── repository
│   │   │   │   │   │   └── BaseRepositoryTest.java
│   │   │   │   │   │   └── TaskRepositoryTest.java
│   │   │   │   │   │   └── UserRepositoryTest.java
│   │   │   │   │   ├── service
│   │   │   │   │   │   └── TaskServiceTest.java
│   │   │   │   │   │   └── UserServiceTest.java
│   │   ├── resources
│   │   │   └── application-test.properties

📊 Tree Summary
📁 Folders: 28
📄 Files: 53
```

## 🔗 Related Documentation

📖 See [Main README](../../README.md) for global setup.