# 🧾 ToDoList UI Kit

A shared component and style library used by both todolist-fe-nextjs and todolist-storybook. It provides reusable React components, hooks, providers, styles, and TypeScript types for consistent UI and behavior across projects.

⚠️ To avoid broken styles, add all Tailwind classes used in your components to the `safelist` array inside `tailwind.config.cjs` of consumer projects.

⚠️ After any change to this library, you must run the copy-ui-kit script to sync updates with the consuming frontends. This ensures that both Next.js and Storybook projects reflect the latest UI definitions.

## 📦 Features

- 🧱 UI Components: buttons, modals, navbars, toggles, dropdowns, spinners, etc.
- 🧠 Hooks: language switching, theme control, responsive visibility, field validation
- 🧬 Providers: i18n, theme, view context
- 🎨 Styles: global CSS and theme variants (light, dark, custom)
- 🧾 Types: DTOs, filters, enums, shared interfaces
- 🛠 Utilities: i18n helpers, CSS variable access

## 🛠 Tech Stack

| Layer     | Technology         |
| --------- | ------------------ |
| Framework | React 18           |
| Styling   | Tailwind CSS 4     |
| Animation | Framer Motion      |
| Language  | TypeScript 5.5     |
| Tooling   | ESLint 9, TSConfig |

## 🧪 Compatibility

- Node.js ≥ 20.x
- React 18.2.0
- Tailwind CSS 4.1.12

## ⚙️ Scripts

| Script | Description                           |
| ------ | ------------------------------------- |
| `lint` | Runs ESLint on `.ts` and `.tsx` files |

## 📁 Project Structure

```
└── eslint.config.cjs
└── package.json
└── README.md
├── src
│   ├── assets
│   │   ├── i18n
│   │   │   └── en.json
│   │   │   └── it.json
│   ├── components
│   │   └── Icons.tsx
│   │   └── index.ts
│   │   ├── ui
│   │   │   └── button.css
│   │   │   └── Button.tsx
│   │   │   └── Dropdown.tsx
│   │   │   └── header.css
│   │   │   └── Header.tsx
│   │   │   └── IconButton.tsx
│   │   │   └── index.ts
│   │   │   └── LangSwitcher.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │   └── MenuGroup.tsx
│   │   │   └── MenuItem.tsx
│   │   │   └── Modal.tsx
│   │   │   └── NavBar.tsx
│   │   │   └── page.css
│   │   │   └── Page.tsx
│   │   │   └── Switch.tsx
│   │   │   └── TextField.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   │   └── ToggleButton.tsx
│   │   │   └── ToggleButtonGroup.tsx
│   ├── hooks
│   │   └── index.ts
│   │   └── useFieldValidation.ts
│   │   └── useLang.ts
│   │   └── useResponsiveVisibility.ts
│   │   └── useTheme.ts
│   │   └── useTranslation.ts
│   │   └── useView.ts
│   └── index.ts
│   ├── providers
│   │   └── i18n.tsx
│   │   └── index.ts
│   │   └── theme.tsx
│   │   └── view.tsx
│   ├── styles
│   │   └── globals-base.css
│   │   └── globals.css
│   │   ├── themes
│   │   │   └── custom-theme.css
│   │   │   └── dark-theme.css
│   │   │   └── light-theme.css
│   ├── types
│   │   ├── dto
│   │   │   └── index.ts
│   │   │   └── TaskDto.ts
│   │   │   └── TaskFilterDto.ts
│   │   │   └── UserDto.ts
│   │   │   └── UserFilterDto.ts
│   │   └── Entity.ts
│   │   ├── filters
│   │   │   └── index.ts
│   │   │   └── TaskFilters.ts
│   │   │   └── UserFilters.ts
│   │   └── Filters.ts
│   │   └── i18n.ts
│   │   └── index.ts
│   │   └── menu.ts
│   │   └── Status.ts
│   │   └── ThemeName.ts
│   │   └── vite-plugin-next.d.ts
│   ├── utils
│   │   └── getCSSVariable.ts
│   │   └── i18n.ts
│   │   └── index.ts
└── tsconfig.json

📊 Tree Summary
📁 Folders: 13
📄 Files: 64
```

## 🔗 Related Documentation

📖 See [Main README](../README.md) for global setup and shared scripts.

📖 See [storybook README](../todolist-storybook/README.md) to check how components are validated.

📖 See [nextjs README](../todolist-fe-nextjs/README.md) to discover how components are used in frontend.
