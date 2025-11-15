# 🧾 ToDoList UI Kit

A shared component and style library used by both todolist-fe-nextjs and todolist-storybook. It provides reusable React components, hooks, providers, styles, and TypeScript types for consistent UI and behavior across projects.

⚠️ To avoid broken styles, add all Tailwind classes used in your components to the `safelist` array inside `tailwind.config.cjs` of consumer projects.

⚠️ After any change to this library, you must run the copy-ui-kit script to sync updates with the consuming frontends. This ensures that both Next.js and Storybook projects reflect the latest UI definitions.

## 📦 Features

- 🧱 UI Components: buttons, modals, navbars, toggles, dropdowns, spinners, etc.
- 🧠 Hooks: language switching, theme control, responsive visibility, field validation
- 🧬 Providers: i18n, theme, view context
- 🎨 Styles: global CSS and theme variants (sunleaf, midnight, skyline)
- 🧾 Types: DTOs, filters, enums, shared interfaces
- 🛠 Utilities: i18n helpers, CSS variable access

## ✅ Validation System
The UI Kit includes a centralized validation system designed to provide consistent feedback across all form controls.

### 🔍 Field-Level Validation
- The `useFieldValidation` hook handles both mandatory and custom validation logic:
- Tracks user interaction (onBlur) to avoid premature error display
- Validates required fields and applies custom rules per field
- Returns:
    - `isFormValid`: overall form validity
    - `markTouched(fieldName)`: marks a field as interacted
    - `hasError(fieldName)`: boolean flag for error state
    - `getHelper(fieldName)`: contextual helper message (error or warning)

### 🧠 Custom Rules
Each field can define a displayRule and a helper message:

```
{
  username: {
    displayRule: (val) => val !== "" && taken.includes(val),
    helper: { type: "error", text: "Username already exists" },
  },
  status: {
    displayRule: (val) => val === "BLOCKED",
    helper: { type: "warning", text: "Assigned tasks will be paused" },
  }
}
```

### 🎯 Helper Messaging
Validation messages are rendered using the `ValidationRenderer` component:
- Supports both compact and grid layouts
- Styled consistently across TextField, Dropdown, and Switch

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
│   │   │   └── Anchor.tsx
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
│   │   └── ValidationRenderer.tsx
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
│   │   │   └── midnight-theme.css
│   │   │   └── skyline-theme.css
│   │   │   └── sunleaf-theme.css
│   ├── types
│   │   └── declarations.d.ts
│   │   ├── dto
│   │   │   └── index.ts
│   │   │   └── TaskDto.ts
│   │   │   └── TaskFilterDto.ts
│   │   │   └── UserDto.ts
│   │   │   └── UserFilterDto.ts
│   │   └── Entity.ts
│   │   ├── filters
│   │   │   └── DashboardFilters.ts
│   │   │   └── index.ts
│   │   │   └── TaskFilters.ts
│   │   │   └── UserFilters.ts
│   │   └── Filters.ts
│   │   └── i18n.ts
│   │   └── index.ts
│   │   └── menu.ts
│   │   └── Status.ts
│   │   └── ThemeName.ts
│   │   └── Validation.ts
│   │   └── vite-plugin-next.d.ts
│   ├── utils
│   │   └── getCSSVariable.ts
│   │   └── i18n.ts
│   │   └── index.ts
└── tsconfig.json

📊 Tree Summary
📁 Folders: 13
📄 Files: 69
```

## 🔗 Related Documentation

📖 See [Main README](../README.md) for global setup and shared scripts.

📖 See [storybook README](../storybook/README.md) to check how components are validated.

📖 See [nextjs README](../fe-nextjs/README.md) to discover how components are used in frontend.
