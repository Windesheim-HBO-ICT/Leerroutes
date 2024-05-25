import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
];
