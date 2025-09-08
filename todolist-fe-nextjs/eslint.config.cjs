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
    ignores: ["**/.next/**", "**/out/**"],
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
