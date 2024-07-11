import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2779F5",
    },
    secondary: {
      main: "#F45E0C",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "whitesmoke",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export default lightTheme;
