import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme = extendTheme({
  breakpoints,
});

export default theme;
