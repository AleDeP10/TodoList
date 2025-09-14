# 🧾 ToDoList — Frontend Next.js (v14)

A multilingual, themeable task and user management interface built with Next.js, TanStack, TailwindCSS, and Redux Toolkit.

## 🌐 Live Version

The project is available on Render at: 👉 https://todolist-fe-nextjs.onrender.com

## 🧩 Features

    • 🌍 Language toggle (IT / EN)
    • 🎨 Theme switcher (light / dark / custom)
    • 📁 Navigation with dropdowns for Features and About
    • 👥 User management with filtering, validation, and confirmation modals
    • ✅ Task management adds status progression and assignments
    • 🔔 Toast notifications and loading spinner for visual feedback

## 🛠 Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | Next.js 14             |
| Styling     | TailwindCSS 4          |
| State       | Redux Toolkit          |
| Query       | TanStack Query         |
| Icons       | Lucide React           |
| Toasts      | React Tostify          |
| Animations  | Framer Motion          |
| HTTP        | Axios                  |
| Tooling     | ESLint 9, PostCSS      |
| Build Tool  | yarn 1.22.19 (shimmed) | 
| Proxy       | Nginx                  |
| Testing     | Vitest + Playwright    |
| Container   | Docker                 |


## 🧪 Compatibility

    • Node.js ≥ 20.x
    • Yarn 1.22.19 (shimmed)
    • TypeScript 5.5
    • React 18.2

⚠️ In order to grant the compatibility with Storybook and maintain consistency across the workspace, this project uses a local Yarn 1.x shim. Execution is blocked if Yarn is not resolved via the shim, and Yarn 2+ (Berry) is explicitly unsupported.

To ensure proper setup, run the setup script from the root directory. Refer to the [Main README](../README.md) for script documentation.

If the shim is not detected, add <root>/dist/scripts/shims at the top to your system PATH.

## ⚙️ Scripts

| Script                 | Description                                                          |
|------------------------|----------------------------------------------------------------------|
| `yarn run dev`         | Starts the app in development mode on port 3000 with hot reload      |
| `yarn run build`       | Compiles the app for production, generating the `.next` output       |
| `yarn run start`       | Serves the compiled `.next` app in production mode                   |
| `yarn run serve-nginx` | Starts the secure proxy to the backend via                           |
| `yarn run lint`        | Runs ESLint on all source                                            |

🧠 **Note:** Open two parallel terminals — one for `yarn run dev` and one for `yarn run serve-nginx` to enable secure backend proxying via HTTP.

## 🚀 Installation & Launch

<!-- actual anchor -->
<a name="installation-and-launch"></a>

### 🐳 Using Docker

Use Docker Desktop or run the app locally with:
```
docker build -t todolist-fe-nextjs .
docker run -p 3001:3000 todolist-fe-nextjs
```
Then access the app at: 📍 http://localhost:3001

### 🧪 Local Setup (without Docker)

#### Prerequisites

    • Node.js ≥ 20.x
    • Yarn 1.22.19 (shimmed)

#### Launch
```
yarn install
yarn run dev
```
On a second terminal, activate the proxy to the backend via nginx with 
```
yarn run serve-nginx
```
Access the app at: 📍 http://localhost:3000

## 🧾 General Notes

    • `.env.local` defines `NEXT_PUBLIC_API_URL=/api` for secure backend proxying  
    • `nginx.conf` handles local routing and HTTPS via custom certificates  
    • Dockerfile uses multi-stage build with Node and NGINX to serve static output  
    • Yarn 1.22.19 shim is enforced for compatibility with Storybook and shared tooling  
    • Project tested on Windows 10 with Node.js ≥ 20.x  


## 📁 Project Structure

```
├── assets
│   └── images
├── nginx
│   └── certs
│   └── mime.types
│   └── nginx.conf
├── public
│   └── styles
│   └── themes
├── src
│   ├── api
│   ├── app
│   ├── components
│   ├── hooks
│   ├── store
│   ├── utils
├── .env.local
├── Dockerfile
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
├── vite.config.cjs
```

## 🔗 Related Documentation

📖 See [Main README](../README.md) for global setup and shared scripts.

📖 See [ui-kit README](../todolist-ui-kit/README.md) for the details about shared items.

