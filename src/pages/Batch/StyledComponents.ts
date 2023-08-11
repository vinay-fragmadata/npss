import { Box, Paper, styled } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f6f9",
  paddingBottom: "1%",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "4% auto",
  padding: "2% 4%",
}));

export const StyledPaperInner = styled(Paper)(({ theme }) => ({
  width: "94%",
  marginBottom: "2%",
  padding: "4% 4% 2% 2% ",
  backgroundColor: "#f5f6f9",
}));

export const StyledTransactionResult = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "5%",
}));
