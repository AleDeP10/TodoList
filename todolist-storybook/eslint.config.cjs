const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: ["**/*.cjs"],
  },

  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ),

  {
    files: ["**/*.{ts,tsx,js}"],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
    },
  },
];
