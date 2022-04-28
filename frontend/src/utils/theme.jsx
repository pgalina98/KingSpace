import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#bf360c",
      light: "#ff8f00",
    },
  },
  font: {
    fontSize: { small: 12, medium: 14, large: 16 },
  },
});

export default theme;
