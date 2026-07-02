import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",
    },

    secondary: {
      main: "#81C784",
    },

    background: {
      default: "#F5F7F5",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Roboto, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;