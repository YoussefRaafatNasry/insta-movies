import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#ffe3ed",
      100: "#feb6c9",
      200: "#f789a6",
      300: "#f25a82",
      400: "#ed2c5e",
      500: "#eb144c",
      600: "#a50b35",
      700: "#770525",
      800: "#490116",
      900: "#1e0008",
    },
  },
  components: {
    Input: {
      defaultProps: {
        size: "lg",
      },
    },
  },
});
