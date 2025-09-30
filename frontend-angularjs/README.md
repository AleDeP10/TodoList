# 🧾 ToDoList — Frontend AngularJS

A responsive web interface for task management, built with AngularJS 1.x and Redux Classic.

## 🌐 Live Version

The project is available on Render at: 👉 https://todolist-fe-angularjs.onrender.com

## 🧩 Features

- ✅ Create, edit, and delete tasks
- 👥 User assignment and status management
- 🌐 Dynamic localization (EN / IT)
- 🔍 Persistent filter panel
- ⚡ Dual-mode filtering:
  - Server-side: default, efficient on large datasets
  - Client-side: reactive, based on Redux Classic
- ⏩ Legacy compatibility:
  - PAUSED tasks are treated as IN PROGRESS to preserve pre-existing behavior
  - No refactoring required for legacy views or workflows
- 🎨 Responsive UI with gradient theming and state-based styling
- 🧠 Modular architecture with Redux store and dedicated services

## 🛠 Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Frontend   | AngularJS 1.x, Bootstrap 5 |
| Styling    | SCSS                       |
| State      | Redux Classic (ng-redux)   |
| Icons      | bootstrap-icons            |
| Build Tool | npm                        |
| Proxy      | nginx                      |
| Container  | Docker                     |

## 🧪 Compatibility

- Node.js ≥ 20.x
- npm ≥ 10.x
- TypeScript 5.5
- AngularJS 1.8.3

## ⚙️ Scripts

| Script        | Description                                      |
| ------------- | ------------------------------------------------ |
| `clean`       | Removes the `dist` folder and recreates it       |
| `build-css`   | Compiles SCSS to CSS                             |
| `copy-static` | Copies static assets to `dist`                   |
| `build`       | Runs `clean`, `build-css`, and `copy-static`     |
| `serve`       | Launches the app with NGINX and shows local link |

<a name="installation-and-launch"></a>

## 🚀 Installation & Launch

### 🐳 Using Docker

Use Docker Desktop or run the app locally with:

```
docker build -t todolist-fe-angularjs .
docker run -p 8081:8080 todolist-fe-angularjs
```

Open the frontend at: 📍 http://localhost:8081/index.html

### 🧪 Local Setup (without Docker)

#### Prerequisites

- Node.js ≥ 20.x
- npm ≥ 10.x

#### Launch

```
npm install
npm run serve
```

Open: 📍 http://localhost:8080/index.html

## 🧾 General Notes

- The config.json file manages environment configuration (API_BASE_URL)
- The nginx.dev.conf file is used for local routing
- The Dockerfile includes SCSS build and NGINX setup
- Structure tested on Windows 10 with Node.js ≥ 20.x

## 📁 Project Structure

```
├── .vscode
│   └── extensions.json
└── app.js
├── assets
│   ├── i18n
│   │   └── en.json
│   │   └── it.json
│   ├── icons
│   │   └── android-chrome-192x192.png
│   │   └── android-chrome-512x512.png
│   │   └── apple-touch-icon.png
│   │   └── favicon-16x16.png
│   │   └── favicon-32x32.png
│   │   └── favicon.ico
│   │   └── site.webmanifest
└── config.Docker.json
└── config.json
└── config.Production.json
├── controllers
│   └── taskController.js
└── copy-static.js
├── directives
│   └── modalContainer.js
└── Dockerfile
└── Dockerfile.local
├── filters
│   └── i18nFilter.js
└── index.html
├── lib
│   └── ng-redux.min.js
└── mime.types
└── nginx.conf
└── nginx.dev.conf
└── package-lock.json
└── package.json
└── README.md
├── services
│   └── i18nService.js
│   └── taskService.js
│   └── userService.js
├── store
│   └── configureStore.js
│   ├── middleware
│   │   └── logger.js
│   ├── reducers
│   │   └── taskReducer.js
├── styles
│   ├── partials
│   │   └── _filters.scss
│   │   └── _layout.scss
│   │   └── _modal.scss
│   │   └── _toggle.scss
│   │   └── _variables.scss
│   └── style.css
│   └── style.scss
├── utils
│   └── modalUtils.js
│   └── toastUtils.js

📊 Tree Summary
📁 Folders: 15
📄 Files: 43
```

## 🔗 Related Documentation

📖 See [Main README](../README.md) for global setup and shared scripts.
