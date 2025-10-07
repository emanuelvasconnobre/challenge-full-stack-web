import prettierConfig from "eslint-config-prettier";
import vuetify from "eslint-config-vuetify";
import prettierPlugin from "eslint-plugin-prettier";

export default vuetify(prettierConfig, [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
