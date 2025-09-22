const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ),
  {
    files: ["**/*.{ts,tsx,js,cjs}", "**/*.json"],
    ignores: ["README.md", "package.json"],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["eslint.config.js", "eslint.config.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["frontend-angularjs/**/*.{ts,js}"],
    rules: {
      "no-console": "warn",
    },
  },
];
