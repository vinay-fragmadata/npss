import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";

/**
 * Custom Styling
 */
export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "4% auto",
  padding: "2% 4%",
}));

export const StyledInnerPaper = styled(Paper)(({ theme }) => ({
  width: "98%",
  marginLeft: "2.2%",
  backgroundColor: "#f5f6f9",
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "fit-content",
}));

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  margin: "0 0 4% 0",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: "#f5f6f9",
  padding: "2% 2% 5% 2% !important",
}));

export const StyledBoxCardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  height: "42vh",
}));

export const StyledBoxFlex = styled(Box)(({ theme }) => ({
  padding: "2% 0",
  width: "97%",
}));

export const StyledBoxIPP = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
}));

export const StyledTypographyIPP = styled(Typography)(({ theme }) => ({
  fontFamily: "Gilroy-Semibold",
  marginRight: "1%",
  fontSize: "14px",
}));

export const StyledTypographyIPPRef = styled(Typography)(({ theme }) => ({
  fontFamily: "Gilroy-Medium",
  fontSize: "14px",
}));

export const StyleBoxPaper = styled(Paper)(({ theme }) => ({
  width: "97%",
  height: "fit-content",
  marginLeft: "0%",
  marginBottom: "2%",
}));
