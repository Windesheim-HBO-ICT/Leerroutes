import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended, "prettier",
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];