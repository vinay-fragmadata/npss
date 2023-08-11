import { Box, styled } from "@mui/material";

export const StyledFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  marginBottom: "2%",
}));
