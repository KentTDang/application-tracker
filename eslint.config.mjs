import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  {
    ignores: ["build/*", "node_modules/*", "public/*", "src/firebase.js"],
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
];
