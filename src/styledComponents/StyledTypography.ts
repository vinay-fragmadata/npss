import { styled, Typography } from "@mui/material";

/**
 * @area Login Page
 */
export const StyledForgotPasswordTypography = styled(Typography)(
  ({ theme }) => ({
    color: "rgb(255, 94, 0)",
    fontFamily: "Gilroy-Medium",
    fontSize: "14px",
    fontWeight: "500",
    height: "18px",
    letterSpacing: "0px",
    margin: "8% 0%",
    cursor: "pointer",
    width: "fit-content",
  })
);

/**
 * @area Login Page
 */
export const StyledPrimaryTypography = styled(Typography)(({ theme }) => ({
  color: "rgb(49, 49, 49)",
  fontFamily: "Gilroy-Medium",
  fontSize: "28px",
  fontWeight: "500",
  height: "35px",
  marginBottom: "10px",
  margin: "0 4%",
}));

/**
 * @area Login Page
 */
export const StyledSecondaryTypography = styled(Typography)(({ theme }) => ({
  color: "rgb(173, 184, 191)",
  fontFamily: "Gilroy-Medium",
  fontSize: "16px",
  fontWeight: "400",
  height: "35px",
  letterSpacing: "0px",
  lineHeight: "2.5",
  margin: "0 4%",
}));
