import { createTheme } from "@mui/material/styles";

/**
 * Design tokens — single source of truth for colors, type, and shape.
 * Use `theme.palette.*`, `theme.typography`, and `theme.appTokens` in components.
 */
export const appTokens = {
  palette: {
    primary: {
      main: "#ff7727",
      dark: "#FF5E00",
      light: "#ffa04d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4f4f4f",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#313131",
      secondary: "#adb8bf",
      disabled: "#adb8bf",
    },
    border: {
      default: "#c1c9cf",
      subtle: "#E4E6ED",
    },
    icon: {
      secondary: "#4A5052",
    },
  },
  typography: {
    fontFamily: {
      regular: '"Gilroy-Regular", "Helvetica Neue", Arial, sans-serif',
      medium: '"Gilroy-Medium", "Helvetica Neue", Arial, sans-serif',
      semibold: '"Gilroy-Semibold", "Helvetica Neue", Arial, sans-serif',
    },
  },
  shape: {
    /** Matches existing 2px corners across forms and papers */
    borderRadius: 2,
  },
} as const;

/**
 * @deprecated Prefer `theme.palette.primary.main` or `appTokens.palette.primary.main`.
 * Kept for existing imports (e.g. StyledTextBox).
 */
export const COLORS = {
  primary_color: appTokens.palette.primary.main,
  primary_dark: appTokens.palette.primary.dark,
  text_primary: appTokens.palette.text.primary,
  text_secondary: appTokens.palette.text.secondary,
  border_default: appTokens.palette.border.default,
} as const;

declare module "@mui/material/styles" {
  interface Theme {
    appTokens: typeof appTokens;
  }
  interface ThemeOptions {
    appTokens?: typeof appTokens;
  }
}

/**
 * Application MUI theme — pass to `<ThemeProvider theme={appTheme}>`.
 */
export const appTheme = createTheme({
  appTokens,
  palette: {
    primary: { ...appTokens.palette.primary },
    secondary: { ...appTokens.palette.secondary },
    text: {
      primary: appTokens.palette.text.primary,
      secondary: appTokens.palette.text.secondary,
      disabled: appTokens.palette.text.disabled,
    },
    divider: appTokens.palette.border.subtle,
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: appTokens.typography.fontFamily.regular,
    h1: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    h2: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    h3: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    h4: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    h5: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    h6: { fontFamily: appTokens.typography.fontFamily.medium, fontWeight: 500 },
    subtitle1: { fontFamily: appTokens.typography.fontFamily.medium },
    subtitle2: { fontFamily: appTokens.typography.fontFamily.medium },
    body1: { fontFamily: appTokens.typography.fontFamily.regular },
    body2: { fontFamily: appTokens.typography.fontFamily.regular },
    button: {
      fontFamily: appTokens.typography.fontFamily.semibold,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: appTokens.shape.borderRadius,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: appTokens.palette.primary.dark,
          "&:hover": {
            backgroundColor: appTokens.palette.primary.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: appTokens.shape.borderRadius,
          "& fieldset": {
            borderColor: appTokens.palette.border.default,
          },
          "&:hover fieldset": {
            borderColor: appTokens.palette.primary.dark,
          },
          "&.Mui-focused fieldset": {
            borderColor: appTokens.palette.primary.dark,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: appTokens.palette.secondary.main,
          "&.Mui-focused": {
            color: appTokens.palette.secondary.main,
            fontFamily: appTokens.typography.fontFamily.medium,
            fontWeight: 800,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: appTokens.shape.borderRadius,
        },
      },
    },
  },
});

export type AppTheme = typeof appTheme;
