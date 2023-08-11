import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { number, func } from "prop-types";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";

import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

import {
  setSingleTransaction,
  setTransactionID,
} from "../../../redux/dashboard/dashboard.actions";
import { setSelectedTransactionIDs } from "../../../redux/searchTransaction/searchTransaction.actions";

import { APP_ROUTES } from "../../../configs/routes";
import NoRecordsFound from "../../../components/NoRecordsFound";

import { getFormattedDate } from "../../../utils/helper/getFormattedDateAndTime";
import ArrayOperations from "../../../utils/helper/arrayOperation";
import LocalStorageService from "../../../utils/Services/LocalStorageService";

import "./style.css";
import {
  StyledTableCell,
  StyledTableCellWithLink,
} from "../../../styledComponents/StyledTableCell";

/**
 * @description Interfaces
 */
interface TransactionInterface {
  internalPaymentInstructionId: string;
}

export default function Transactions({
  tableRows,
  onTransactionReport,
  noOfRows,
  page: currPage,
  columns,
  status,
  onInternalPaymentIDs,
  pageSize,
}: {
  tableRows: any[];
  onTransactionReport: any;
  noOfRows: number;
  page: number;
  columns: any[];
  status: boolean;
  onInternalPaymentIDs: any;
  pageSize: number | any;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get values from store
  const { selectedTransactionIDs }: any = useSelector(
    ({ searchTransaction }: { searchTransaction: object }) => searchTransaction
  );

  const [newTableRows, setTableRows]: any[] = useState(tableRows);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(currPage);
  const [isAllSelected, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [selectedRows, setSelectRows]: any[] = useState([]);

  /**
   * @description Handling selected values of checkbox
   */
  useLayoutEffect(() => {
    getIndeterminate(selectedTransactionIDs, tableRows);
    setTableRows(tableRows);
    if (selectedRows && selectedRows.length == 0)
      setSelectRows(selectedTransactionIDs);
  }, [tableRows, status, selectedRows, selectedTransactionIDs]);

  /**
   * @description Rows as per page change
   * @param {Object} event
   */
  const handleChangeRowsPerPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setRowsPerPage(+event?.target?.value);

    onTransactionReport(page, +event?.target?.value);
  };

  /**
   * @description handle page change
   *
   * @param {Number} newPage
   */
  const handleChangePage = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    newPage: number
  ) => {
    setPage(newPage);
    const data = await onTransactionReport(newPage, rowsPerPage);

    getIndeterminate(selectedRows, data);
  };

  /**
   * @description Handling Header checkbox to select, unselect, indeterminate
   *
   * @param {array of number} selectedRows
   * @param {object} rows
   */
  const getIndeterminate = (selectedRows: number[], rows: any) => {
    setSelectAll(false);
    setIndeterminate(false);

    // Check selection on page change
    const selectedIDs = getSelectedRowsWithChecks(selectedRows, rows);
    const selectionCounts = selectedIDs.filter((row) => row?.isSelected);

    if (selectionCounts.length === pageSize) {
      setIndeterminate(false);
      setSelectAll(true);
    } else if (!selectionCounts) {
      setSelectAll(false);
      setIndeterminate(false);
    } else if (
      selectionCounts.length > 0 &&
      selectionCounts.length < pageSize
    ) {
      setIndeterminate(true);
      setSelectAll(false);
    }
  };

  /**
   * @description Get Transaction detail
   *
   * @param row
   */
  const getTransactionDetail = (row: object) => {
    const { internalPaymentInstructionId = "" } =
      (row as TransactionInterface) || {};

    // store  values in redux
    dispatch(setSingleTransaction(row));
    dispatch(setTransactionID(internalPaymentInstructionId));

    navigate(
      APP_ROUTES.TRANSACTION_DETAIL.replace(":id", internalPaymentInstructionId)
    );
  };

  /**
   * @description: Select all Rows
   */
  const handleSelectAll = () => {
    const allSelectedTableRows: any[] = newTableRows.map((tableRow: object) => {
      return { ...tableRow, isSelected: !isAllSelected };
    });

    setSelectAll(!isAllSelected);
    setTableRows(allSelectedTableRows);

    if (isAllSelected) {
      allSelectedTableRows.map((row) => {
        const obj = selectedRows.find(
          (id: number) => id == row.internalPaymentInstructionId
        );

        const index = selectedRows.indexOf(obj);
        selectedRows.splice(index, 1);
      });

      getIndeterminate(selectedRows, allSelectedTableRows);

      dispatch(setSelectedTransactionIDs(selectedRows));
      onInternalPaymentIDs(selectedRows);
      return setSelectRows(selectedRows);
    } else {
      allSelectedTableRows.forEach((row) =>
        selectedRows.push(row.internalPaymentInstructionId)
      );

      const withoutDuplicates: string[] | number[] | any =
        ArrayOperations.removeDuplicateValues(selectedRows);

      getIndeterminate(withoutDuplicates, allSelectedTableRows);

      onInternalPaymentIDs(withoutDuplicates);
      setSelectRows(withoutDuplicates);
      dispatch(setSelectedTransactionIDs(withoutDuplicates));
    }
  };

  /**
   * @description Handle Single Check box selection
   *
   * @param {string|number} id
   * @returns
   */
  const handleSingleCheck = (id: String | number) => (_: object) => {
    if (selectedRows && selectedRows.includes(id)) {
      // Getting unselected check index from id container
      const index = selectedRows.findIndex(
        (internalPaymentInstructionId: string | number) =>
          internalPaymentInstructionId == id
      );

      // Removing unselected check from id container
      selectedRows.splice(index, 1);

      // uncheck checkbox
      const allSelectedTableRows: any[] = newTableRows.map((tableRow: any) => {
        if (tableRow.internalPaymentInstructionId !== id) return tableRow;

        return { ...tableRow, isSelected: false };
      });
      getIndeterminate(selectedRows, allSelectedTableRows);
      onInternalPaymentIDs(selectedRows);
      setSelectRows(selectedRows);
      setTableRows(allSelectedTableRows);
      dispatch(setSelectedTransactionIDs(selectedRows));
    } else {
      selectedRows.push(id);

      onInternalPaymentIDs(selectedRows);
      setSelectRows(selectedRows);
      dispatch(setSelectedTransactionIDs(selectedRows));

      // Check checkbox
      const allSelectedTableRows: any[] = newTableRows.map((tableRow: any) => {
        if (tableRow?.internalPaymentInstructionId !== id) return tableRow;

        return { ...tableRow, isSelected: true };
      });
      getIndeterminate(selectedRows, allSelectedTableRows);

      setTableRows(allSelectedTableRows);
    }

    setSelectAll(false);
  };

  /**
   * @description Handling multiple check selection
   */
  useEffect(() => {
    if (selectedRows && selectedRows.length > 0) {
      const selectedIDs = getSelectedRowsWithChecks(selectedRows, tableRows);
      setTableRows(selectedIDs);
    }
  }, [selectedRows, tableRows]);

  const getSelectedRowsWithChecks = (
    selectedRows: number[],
    tableRows: any[]
  ) => {
    return tableRows.map((row: any) => {
      const obj = selectedRows.find(
        (selectedRow: number) => selectedRow == row.internalPaymentInstructionId
      );

      if (obj) {
        return { ...row, isSelected: true };
      } else {
        return row;
      }
    });
  };

  /**
   * @description @callback Passing paymentIDs
   */
  useEffect(() => {
    onInternalPaymentIDs(selectedRows);
  }, [selectedRows]);

  return (
    <>
      {status && (
        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="table-container"
          data-testid="transaction-id"
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => {
                    const { id, align, minWidth, label } = column || {};

                    if (!label) return;
                    return (
                      <>
                        {/* {id === "checkbox" ? (
                          <StyledTableCell
                            key={index}
                            align={align}
                            style={{ minWidth: minWidth }}
                            padding="checkbox"
                          >
                            <Checkbox
                              color="primary"
                              checked={isAllSelected}
                              inputProps={{
                                "aria-labelledby": "labelId",
                              }}
                              // checkedIcon={<KeyboardArrowRight />}
                              // icon={<KeyboardArrowRight />}
                              indeterminate={indeterminate && !isAllSelected}
                              disabled={newTableRows.length == 0}
                              onChange={handleSelectAll}
                            />
                          </StyledTableCell>
                        ) : ( */}
                        {column.id != "transactionRefNum" && (
                          <StyledTableCell
                            key={index}
                            align={align}
                            style={{ minWidth: minWidth }}
                          >
                            {label}
                          </StyledTableCell>
                        )}

                        {column.id == "transactionRefNum" && (
                          <StyledTableCellWithLink
                            key={index}
                            align={align}
                            style={{ minWidth: minWidth }}
                          >
                            {label}
                          </StyledTableCellWithLink>
                        )}
                        {/* // )} */}
                      </>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {newTableRows &&
                  newTableRows
                    // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row: any, index: number) => {
                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];

                            if (!value) return;

                            return (
                              <>
                                {/* {
                                column.id === "checkbox" ? (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    padding="checkbox"
                                  >
                                    <Checkbox
                                      color="primary"
                                      checked={row.isSelected}
                                      inputProps={{
                                        "aria-labelledby": "labelId",
                                      }}
                                      onChange={handleSingleCheck(
                                        row?.internalPaymentInstructionId
                                      )}
                                      disabled={newTableRows.length == 0}
                                    />
                                  </StyledTableCell>
                                ) : ( */}
                                {column.id != "transactionRefNum" && (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    onClick={() =>
                                      column.id == "transactionRefNum" &&
                                      getTransactionDetail(row)
                                    }
                                  >
                                    {column.id == "date"
                                      ? getFormattedDate(value)
                                      : value}
                                  </StyledTableCell>
                                )}

                                {/* )} */}

                                {column.id == "transactionRefNum" && (
                                  <StyledTableCellWithLink
                                    key={column.id}
                                    align={column.align}
                                    onClick={() => getTransactionDetail(row)}
                                  >
                                    {column.id == "date"
                                      ? getFormattedDate(value)
                                      : value}
                                  </StyledTableCellWithLink>
                                )}
                              </>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          {newTableRows.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={noOfRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              data-testid="table-pagination-id"
              labelRowsPerPage={"Rows per page"}
            />
          )}

          {status &&
            (!newTableRows ||
              (newTableRows.length === 0 && <NoRecordsFound open={status} />))}
        </Paper>
      )}

      {status &&
        (!newTableRows ||
          (newTableRows.length === 0 && (
            <Typography className="no-record-found">No Record Found</Typography>
          )))}
    </>
  );
}

interface TablePaginationInterface {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: any;
}
/**
 * @description Customized Table Pagination
 *
 * @param {Object} props
 * @returns
 */
const TablePaginationActions = (props: object) => {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } =
    (props as TablePaginationInterface) || {};
  // const [enteredPage, setEnterPage] = React.useState(null);

  const localPage = LocalStorageService.getData("page");

  // const handleFirstPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  // ) => {
  //   onPageChange(event, 0);
  // };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    onPageChange(event, localPage - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    onPageChange(event, localPage + 1);
  };

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
  );
};

TablePaginationActions.propTypes = {
  count: number.isRequired,
  onPageChange: func.isRequired,
  page: number.isRequired,
  rowsPerPage: number.isRequired,
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90px",
}));
function row(value: any, index: number, array: any[]): void {
  throw new Error("Function not implemented.");
}
