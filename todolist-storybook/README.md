# 📚 ToDoList Storybook

A fully dockerized Storybook environment for showcasing and testing UI components from the todolist-ui-kit library. This project is used to validate visual consistency, behavior, and accessibility of shared components before integration into frontend applications.

## 🌐 Live Version

The project is available on Render at: 👉 https://todolist-storybook.onrender.com

## 🧪 Purpose

This Storybook instance provides a live preview and testing ground for UI components shared across the ToDoList ecosystem. It supports:

- Component isolation and interaction
- Visual regression testing
- Accessibility checks
- Theming and internationalization previews

## 📦 Component Sections

CONTROLS: Button, Dropdown, FormValidation, IconButton, Switch, TextField

INTERNATIONALIZATION: LangSwitcher

FEEDBACK: LoadingSpinner

LAYOUT: MenuGroup, Modal, NavBar

THEMING: ThemeSwitcher

## 🛠 Tech Stack

| Layer      | Technology             |
| ---------- | ---------------------- |
| Framework  | React 18               |
| Styling    | Tailwind CSS 4.1.12    |
| Storybook  | Storybook 7.6.0        |
| Language   | TypeScript 5.5.2       |
| Tooling    | ESLint 9, PostCSS      |
| Server     | Express                |
| Build Tool | yarn 1.22.19 (shimmed) |
| Container  | Docker                 |

## 🧪 Compatibility

- Node.js: ≥ 20.x (used in Docker)
- React: 18.2.0
- Tailwind CSS: 4.1.12
- Yarn: 1.x (local shim required)

⚠️ Due to incompatibility between Storybook and Yarn 2+ (Berry), this project uses a local Yarn 1.x shim. Execution is blocked if Yarn is not resolved via local shim.

To ensure proper setup, run the `setup` script from the root directory before building Storybook.  
For details on shared scripts, Yarn compatibility, and workspace tooling, refer to the  
[Main README — NPM vs Yarn Compatibility Notes](../README.md#npm-vs-yarn).

If the shim is not detected, add <root>/dist/scripts/shims at the top to your system PATH.

## ⚙️ Scripts

| Script               | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `lint`               | Runs ESLint on `.ts`, `.tsx`, `.js`, `.cjs` files                            |
| `prebuild`           | Compiles Tailwind input CSS to global styles                                 |
| `build-storybook`    | Builds Storybook static site after invoking prebuild                         |
| `storybook-dev`      | Starts Storybook in development mode on port `6006`                          |
| `storybook`          | Serves the static Storybook build on port `6006`                             |
| `validate-storybook` | Manually run validation script on built Storybook (used only in development) |

<a name="installation-and-launch"></a>

## 🚀 Installation & Launch

### 🐳 Using Docker

Use Docker Desktop or run Storybook locally with:

```
docker build -t todolist-ui-storybook
docker run -p 6007:6006 todolist-ui-storybook
```

Open Storybook at: 📍 http://localhost:6007

### 🧪 Local Setup (without Docker)

#### Prerequisites

- Node.js ≥ 20.x
- Yarn 1.22.19 (shimmed)

#### Launch

```
npm install
npm run build-storybook
npm run storybook
```

Open Storybook at: 📍 http://localhost:6006

## 📁 Project Structure

```
└── .gitattributes
├── .storybook
│   └── main.ts
│   └── preview-head.html
│   └── preview.tsx
├── .vscode
│   └── settings.json
└── .yarnrc
├── build
└── Dockerfile
└── Dockerfile.local
└── eslint.config.cjs
└── package.json
└── postcss.config.cjs
├── public
│   └── index.html
│   ├── styles
│   │   └── globals.css
│   │   ├── themes
│   │   │   └── custom-theme.css
│   │   │   └── dark-theme.css
│   │   │   └── light-theme.css
└── README.md
└── server.cjs
├── src
│   ├── providers
│   │   └── UIKitProvider.tsx
│   ├── stories
│   │   └── Button.stories.tsx
│   │   └── Dropdown.stories.tsx
│   │   └── FormValidation.stories.tsx
│   │   └── IconButton.stories.tsx
│   │   └── InteractionSandbox.tsx
│   │   └── Introduction.stories.tsx
│   │   └── LangSwitcher.stories.tsx
│   │   └── LoadingSpinner.stories.tsx
│   │   └── MenuGroup.stories.tsx
│   │   └── MenuTestWrapper.tsx
│   │   └── Modal.stories.tsx
│   │   └── NavBar.stories.tsx
│   │   └── sharedOutputStyles.css
│   │   └── Switch.stories.tsx
│   │   └── TextField.stories.tsx
│   │   └── ThemeSwitcher.stories.css
│   │   └── ThemeSwitcher.stories.tsx
│   ├── styles
│   │   └── tailwind.input.css
│   └── styles.d.ts
└── tailwind.config.cjs
└── tsconfig.json

📊 Tree Summary
📁 Folders: 10
📄 Files: 40
```

## 🔗 Related Documentation

📖 See Main [Main README](../README.md) for global setup and shared scripts.

📖 See [ui-kit README](../todolist-ui-kit/README.md) for the details about shared items.
