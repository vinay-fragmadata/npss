import { styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

/**
 * Custom styling
 */
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f5f6f9",
    color: "#4968AD",
    fontSize: "12px",
    fontWeight: "bold",
    height: "12px",
    textTransform: "uppercase",
    width: "53px",
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
    width: "61px",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
}));

export const StyledTableCellWithLink = styled(TableCell)(({ theme }) => ({
  cursor: "pointer",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f5f6f9",
    color: "#4968AD",
    fontSize: "12px",
    fontWeight: "bold",
    height: "12px",
    textTransform: "uppercase",
    width: "53px",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
    fontFamily: "Gilroy-medium",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#7896a6",
    fontFamily: "Gilroy-medium",
    fontSize: "14px",
    fontWeight: "500",
    height: "14px",
    width: "61px",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
}));
