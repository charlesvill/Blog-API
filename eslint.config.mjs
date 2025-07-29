import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Common base for all JS
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
    },
    plugins: { js },
    extends: ["js/recommended"],
  },

  // Node/Express backend (CommonJS)
  {
    files: ["server/**/*.{js,cjs}"],
    languageOptions: {
      sourceType: "script", // CommonJS
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
  },

  // React frontend (ESM)
  {
    files: ["client/**/*.{js,jsx,mjs}"],
    languageOptions: {
      sourceType: "module", // ESM
      globals: {
        ...globals.browser,
      },
    },
    ...pluginReact.configs.flat.recommended,
  },
]);

