# 🧾 ToDoList — Fullstack Project Overview

A modular task management system built with a C# backend and two distinct frontend implementations: AngularJS and Next.js. The project also includes a dedicated Storybook workspace for UI documentation and testing.

## 🌐 Live Deployments

| Module          | Live URL                                        |
| --------------- | ----------------------------------------------- |
| 🧠 Backend (C#) | https://todolist-be-csharp.onrender.com/swagger |
| 📘 AngularJS FE | https://todolist-fe-angularjs.onrender.com      |
| ⚛️ Next.js FE   | https://todolist-fe-nextjs.onrender.com         |
| 📚 Storybook    | https://todolist-storybook.onrender.com         |

## 🧩 Common Features

- ✅ Task CRUD: create, edit, delete, and view tasks
- 👥 User assignment: link tasks to users
- 🔄 Status management: TODO, IN PROGRESS, PAUSED, DONE
- 🧪 Validation and confirmation modals
- 🧾 Toast notifications and loading spinners
- 🌐 Localization: dynamic switch between English and Italian

## 🧬 Specific Features

### 📘 AngularJS Frontend

- ⚡ Dual-mode filtering:
  - Server-side: efficient for large datasets
  - Client-side: reactive via Redux Classic
- 🎨 Bootstrap-based UI with SCSS theming

### ⚛️ Next.js Frontend

- 👥 Full user management:
  - Create, edit, delete users
  - Role and status handling
- 🧠 Advanced filtering and validation
- 🎨 Theming: light, dark, and custom variants
- 🧩 UI Kit with reusable components, hooks, and providers
- ⏸️ Task status: supports PAUSED state for blocked assignees

## 🛠 Tech Stack Summary

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Backend      | ASP.NET Core, Entity Framework          |
| AngularJS FE | AngularJS 1.x, Redux Classic, Bootstrap |
| Next.js FE   | Next.js 14, TailwindCSS, Redux Toolkit  |
| UI Testing   | Storybook 7                             |
| Styling      | SCSS (AngularJS), TailwindCSS (Next.js) |
| Container    | Docker, NGINX, Express                  |

## 🐳 Docker Execution

All modules support Docker-based execution:

- 💻 **Docker Desktop**: build and run each project individually using local Dockerfiles
- 🧩 **Docker Compose**: launch all services together from the project root with:

  ```bash
    docker compose up --build
  ```

  This command starts the entire stack — frontends, storybook, backend, and database — fully networked and ready to use.

- ✨ **Unified Environment**: no manual setup required — all services are orchestrated and discoverable via internal Docker networking

## 📊 Port Mapping

| Module       | Port (Local) | Port (Docker) |
| ------------ | ------------ | ------------- |
| Backend (C#) | 5000         | 5001          |
| AngularJS FE | 8080         | 8081          |
| Next.js FE   | 3000         | 3001          |
| Storybook    | 6006         | 6007          |

## 🧪 Developer Installation

Each module includes its own README with setup instructions:

- 🧠 [Database](./db-backup/README.md#restore-instructions)
- 🧠 [Backend C#](./backend-csharp/README.md#installation-and-launch)
- 📘 [AngularJS Frontend](./frontend-angularjs/README.md#installation-and-launch)
- ⚛️ [Next.js Frontend](./todolist-fe-nextjs/README.md#installation-and-launch)
- 📚 [Storybook Workspace](./todolist-storybook/README.md#installation-and-launch)

<a name="npm-vs-yarn"></a>

## 🧵 NPM vs Yarn — Compatibility Notes

During development of the Next.js frontend and Storybook workspace, several inconsistencies emerged when using npm as the package manager:

- ❌ npm failed to resolve peer dependencies correctly across workspaces
- ❌ npm introduced lockfile conflicts when switching between modules
- ❌ npm did not support the required Storybook plugins without patching

To resolve these issues, the project adopted yarn with a custom shim (yarn-1.22.19.cjs) to ensure consistent behavior across all environments.

The implementation process also considered Yarn Berry (v2+), but encountered critical incompatibilities with Storybook 7 — including broken plugin resolution, workspace linking failures, and missing support for legacy configuration formats. These issues made Berry unsuitable for the current monorepo setup.

As a result, Yarn was explicitly locked to version 1.22.19 to guarantee full compatibility across all modules and avoid regressions in the build and development workflows.

## ⚙️ Scripts

| Script                  | Description                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `setup`                 | Runs all setup steps: build scripts, generate shims, enforce Yarn, check versions, and copy UI kit   |
| `build-scripts`         | Compiles TypeScript scripts using `tsconfig.scripts.json`                                            |
| `build-shims`           | Generates local Yarn 1.x shim files and copies shared-resources into subprojects                     |
| `enforce-yarn-shim`     | Verifies that the Yarn shim is correctly resolved before execution                                   |
| `check-versions`        | Validates React, Storybook, TailwindCSS versions across all workspaces and fails if finds mismatches |
| `copy-ui-kit`           | Copies the UI kit into dependent workspaces                                                          |
| `clean-install`         | Performs a clean install by removing `node_modules` and rebuilding reinstalling modules              |
| `copy-shared-resources` | Copies shared resources (shims, binaries, yarn.lock) into each project for Docker compatibility      |

**⚠️ Note on workspace dependencies**

The `yarn.lock` file is automatically regenerated whenever dependencies are added, removed, or updated within any workspace. This may cause misalignment between shared resources and the Storybook environment.  
To ensure consistency, always run `yarn run copy-shared-resources` after modifying dependencies. This step syncs the lockfile and ensures Docker builds and local scripts remain stable.

## 🧪 Cross-Platform Scripts

All Yarn scripts rely on invoking TypeScript modules located in src/scripts, ensuring consistent execution across Windows, macOS, and Linux.

Beyond core implementations, the folder includes utilities for workspace consistency, debugging, and diagnostics:

🧭 printTree.ts: explores and visualizes folder structures for documentation and analysis

🛡️ verifyShimActive.ts: automatically called to check that the local Yarn shim is active and correctly resolved

These tools are integrated into the setup flow and help maintain a stable, reproducible environment.

Each script in src/scripts is documented inline with usage notes and expected behavior, as well as custom hooks.

## 📘 Linting and Conventions

Each package in the monorepo defines its own `eslint.config.cjs` using ESLint v9 FlatConfig. Configs extend shared TypeScript rules and apply framework-specific presets (`Next.js`, `Storybook`, `AngularJS`). Non-code files and build artifacts (`README.md`, `.next`, `out`, `dist`, `shared-resources`, `shared-entities`) are explicitly ignored to prevent false positives. Rules are tuned for clarity and maintainability, with relaxed constraints in configuration and visual test files. This setup ensures consistency, scalability, and developer confidence across all frontend surfaces.

## 🧾 General Notes

- ✔ Local certificates are stored in `nginx/certs` and used for secure proxying
- ✔ Yarn 1.22.19 shim is enforced for compatibility across frontend projects
- ✔ Logging is handled via Pino (Next.js) and console middleware (AngularJS)
- ✔ Custom React hooks are used wherever reusability and separation of concerns are beneficial
- ✔ All modules tested on Windows 10 with Node.js ≥ 20.x, shim yarn.sh also available

## 🔗 Related Documentation

📖 See [Database README](./db-backup/README.md) for schema overview, local restore instructions, and Docker initialization.

📖 See [Backend C# README](./backend-csharp/README.md) for API setup, HTTPS configuration, and shared development scripts.

📖 See [AngularJS Frontend README](./frontend-angularjs/README.md) for SCSS theming, dual-mode filtering, and local installation steps.

📖 See [UI Kit README](./todolist-ui-kit/README.md) for reusable components, hooks, providers, motion utilities, and integration notes.

📖 See [Storybook README](./todolist-storybook/README.md) to explore component validation, theming previews, and accessibility testing.

📖 See [Next.js Frontend README](./todolist-fe-nextjs/README.md) for task and user management, API integration, and advanced UI composition.
