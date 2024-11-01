import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    
    ignores: ["**/node_modules/", ".git/", "dist/"],
    languageOptions: { globals: globals.browser },
    rules:{
      "no-unused-vars":"error",
      "no-undef":"error",
      "no-console":"warn",
    },
    
    
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];