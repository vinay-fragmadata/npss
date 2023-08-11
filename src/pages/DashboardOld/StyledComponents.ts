import { Paper, styled, TextField } from "@mui/material";

/**
 * Custom Styling
 */
export const searchResult = {
  width: "100%",
  marginTop: "5%",
};

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "4% auto",
  padding: "2% 4%",
}));

export const StyledPaperInner = styled(Paper)(({ theme }) => ({
  width: "94%",
  margin: "0",
  padding: "4% 4% 2% 2% ",
  backgroundColor: "#f5f6f9",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  // border: "2px solid red",
  // "& .Mui-focused": {
  //   "& .MuiOutlinedInput-root": { border: "1px solid yellow" },
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& > fieldset": { border: "1px solid red" },
  // },
}));
