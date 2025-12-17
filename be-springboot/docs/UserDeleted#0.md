```mermaid
flowchart TD
  %% User Microservice components
  subgraph User_Microservice
    %% Stores user data
    UDB[(User Database)]
    %% Entry point for user-related requests
    UAPI[User API]
    %% Business logic for user operations
    UService[User Service]
  end
  %% Task Microservice components
  subgraph Task_Microservice
    %% Stores task data
    TDB[(Task Database)]
    %% Business logic for task operations
    TService[Task Service]
  end
  %% Control Tower component
  subgraph Control_Tower
    %% Orchestrates cross-service workflows
    CT[Control Tower]
  end
  %% External systems for logging and monitoring
  subgraph External_Systems
    %% Centralized logging and monitoring
    Logger[Logging & Monitoring]
  end
   
  %% Flow of UserDeleted request
  UAPI --> CT

  CT --> UService
  UService --> UDB

  CT --> TService
  CT --> UAPI

  TService --> TDB

  CT --> Logger
  UService --> Logger
  TService --> Logger
  CT --> CT
```