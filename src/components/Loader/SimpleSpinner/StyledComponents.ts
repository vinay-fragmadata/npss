import { Box, CircularProgress, styled, Typography } from "@mui/material";

export const StyledLoaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  width: "20.5%",
  height: "15%",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: "#FE6409",
  width: "fit-content",
}));

export const StyledLoadingText = styled(Typography)(({ theme }) => ({
  color: "rgb(49, 49, 49)",
  fontFamily: "Gilroy-Semibold",
  fontSize: "16px",
  fontWeight: "600",
  height: "16px",
  letterSpacing: "0px",
  textAlign: "center",
  width: "73px",
  marginTop: "5px",
}));
