import { ThemeProvider, createTheme } from "@mui/material/styles";

const colors = createTheme({
  palette: {
    accent: {
      red: "#ed5564",
    },
  },
});

const Theme = (props) => {
  const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            padding: "20px",
          }),
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            color: colors.palette.accent.red,
            borderColor: colors.palette.accent.red,
          }),
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
