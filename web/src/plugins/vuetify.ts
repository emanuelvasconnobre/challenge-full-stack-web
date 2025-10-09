import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          surface: "#F5F5F5",
          background: "#FFFFFF",
        },
      },
      dark: {
        colors: {
          primary: "#2196F3",
          secondary: "#03DAC6",
          surface: "#000000",
          background: "#121212",
        },
      },
    },
  },
});
