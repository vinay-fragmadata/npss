import { styled, Typography, TableCell, tableCellClasses } from "@mui/material";

/**
 * @Area dashboard card header
 */
export const StyledDashboardCardHeader = styled(Typography)(({ theme }) => ({
  backgroundColor: "#7F898A",
  color: "#FFFFFF",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  fontFamily: "Gilroy-Semibold",
  fontSize: "25px",
  margin: 0,
}));

/**
 * Custom styling
 */
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  cursor: "pointer",
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#f5f6f9",
    color: "#1A4198",
    fontSize: "18px",
    fontWeight: "bold",
    height: "18px",
    textTransform: "uppercase",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
    fontFamily: "Gilroy-medium",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "rgb(49, 49, 49)",
    fontFamily: "Gilroy-medium",
    fontSize: "14px",
    fontWeight: "500",
    height: "14px",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
}));
