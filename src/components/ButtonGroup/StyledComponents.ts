import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "95%",
  margin: "1.5% -0.5%",
}));

export const StyledButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontFamily: "Gilroy-Medium",
  justifyContent: "space-between",
  width: "43%",
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1a4198",
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({}));
