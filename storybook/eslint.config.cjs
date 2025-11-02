const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: [
      "README.md",
      "**/*.cjs",
      "**/*.stories.{ts,tsx,js}",
      "**/*.stories.mdx",
      "**/node_modules/**",
      "shared-resources/**"
    ],
  },

  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ),

  {
    files: ["**/*.{ts,tsx,js}"],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ]
    }
  },

  {
    files: ["**/*.stories.{ts,tsx,js}"],
    rules: {
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
];