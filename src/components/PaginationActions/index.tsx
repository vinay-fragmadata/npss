import React from "react";
import { number, func } from "prop-types";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "./style.scss";

interface TablePaginationInterface {
  count: number;
  localPage: number;
  rowsPerPage: number;
  onPageChange: any;
}

/**
 * @description Customized Table Pagination
 *
 * @param {Object} props
 * @returns
 */
const PaginationActions = (props: TablePaginationInterface) => {
  const theme = useTheme();

  const { count, localPage, rowsPerPage, onPageChange } =
    (props as TablePaginationInterface) || {};
  // const [enteredPage, setEnterPage] = React.useState(null);

  /**
   * @description First page click
   *
   * @param {Object} event
   */
  // const handleFirstPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  // ) => {
  //   onPageChange(event, 0);
  // };

  /**
   * @description Back button click
   *
   * @param {Object} event
   */
  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    onPageChange(event, localPage - 1);
  };

  /**
   * @description Next button click
   *
   * @param {Object} event
   */
  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    onPageChange(event, localPage + 1);
  };

  /**
   * @description LAst page button click
   *
   * @param {Object} event
   */
  // const handleLastPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  // ) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  // /**
  //  * @description Getting page number to search
  //  *
  //  * @param {Object} event
  //  */
  // const handleSearchPage = ({ target: { value = "" } }) => {
  //   if (Number(value) <= Math.max(0, Math.ceil(count / rowsPerPage) - 1)) {
  //     setEnterPage(value);
  //     // onPageChange(value);
  //   }
  // };

  // /**
  //  * @description Go to enter page
  //  *
  //  * @param {Object} event
  //  */
  // const handlePageSearch = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  // ) => {
  //   onPageChange(event, enteredPage);
  // };

  // const SearchButton = () => (
  //   <IconButton>
  //     <Send onClick={handlePageSearch} />
  //   </IconButton>
  // );

  // /**
  //  * @description Label props used in <StyledTextField
  //  */
  // const labelProps = {
  //   shrink: true,
  //   FormLabelClasses: {
  //     root: {
  //       "&:focused": {
  //         color: "red",
  //       },
  //     },
  //     focused: "true",
  //   },
  // };
  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 2 }} className="pagination">
        {/* <StyledTextField
        id="standard-name"
        size="small"
        type="number"
        label="Page"
        onChange={handleSearchPage}
        maxLength={Math.max(0, Math.ceil(count / rowsPerPage)).length}
        value={enteredPage}
        InputProps={{ endAdornment: <SearchButton /> }}
        InputLabelProps={labelProps}
      /> */}
        <IconButton
          className="pagination-indicator"
          disableRipple
          disableFocusRipple
        >
          <Typography className="pagination-indicator">
            {localPage * rowsPerPage + 1} &mdash;
            {localPage >= Math.ceil(count / rowsPerPage) - 1
              ? count
              : rowsPerPage * (localPage + 1)}
            <span>of</span> {count}
          </Typography>
        </IconButton>
        {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={localPage <= 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton> */}

        <IconButton
          onClick={handleBackButtonClick}
          disabled={localPage <= 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>

        <IconButton
          onClick={handleNextButtonClick}
          disabled={localPage >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>

        {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={localPage >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton> */}
      </Box>
    </>
  );
};

/**
 * @description Prop validation
 */
PaginationActions.propTypes = {
  count: number.isRequired,
  onPageChange: func.isRequired,
  localPage: number.isRequired,
  rowsPerPage: number.isRequired,
};

export default PaginationActions;
