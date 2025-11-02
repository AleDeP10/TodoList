const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ),
  {
    files: ["**/*.{ts,tsx,js,cjs}"],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
    },
  },
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/node_modules/**",
      "shared-resources/**",
    ],
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.json"],
    languageOptions: {
      parser: require("jsonc-eslint-parser"),
    },
    rules: {
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];
