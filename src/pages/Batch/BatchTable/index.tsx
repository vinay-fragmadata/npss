import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
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
} from "@mui/material";
import styled from "@emotion/styled";

import { APP_ROUTES, batchSearch } from "../../../configs/routes";
import NoRecordsFound from "../../../components/NoRecordsFound";
import PaginationActions from "../../../components/PaginationActions";

import { getFormattedDate } from "../../../utils/helper/getFormattedDateAndTime";
import "./style.css";

/**
 * @description Check page search
 */
const isBatchSearch = Boolean(window.location.href.includes(batchSearch));

export default function BatchTable({
  tableRows,
  onBatchReport,
  noOfRows,
  page: currPage,
  columns,
  isBatchSearchClicked = false,
  status,
}: {
  tableRows: string[];
  onBatchReport: any;
  noOfRows: number;
  page: number;
  columns: any[];
  isBatchSearchClicked: boolean;
  status: boolean;
}) {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(currPage);

  /**
   * @description Rows as per page change
   * @param {Object} event
   */
  const handleChangeRowsPerPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any | any
  ) => {
    setRowsPerPage(+event?.target?.value);

    onBatchReport(page, +event?.target?.value);
  };

  /**
   * @description handle page change
   * @param {Number} newPage
   */
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
    onBatchReport(newPage, rowsPerPage);
  };

  /**
   * @description Handle Batch search click to redirect to Search-Transaction page
   * @param {String} batchData
   * @navigate /search-transaction
   */
  const handleBatchSearchClick = (batchData: object) => (_: object) => {
    navigate(APP_ROUTES.SEARCH_TRANSACTION, {
      state: { batchID: batchData?.batchId },
    });
  };

  return (
    <>
      {status && (
        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="table-container"
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <StyledTableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column?.minWidth }}
                    >
                      {column?.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows &&
                  tableRows
                    // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, index) => {
                      return (
                        <>
                          {isBatchSearchClicked ? (
                            <TableRow hover tabIndex={-1} key={index}>
                              {columns.map((column) => {
                                const value = row[column.id];

                                return (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    onClick={handleBatchSearchClick(row)}
                                  >
                                    {column.id == "date"
                                      ? getFormattedDate(value)
                                      : value}
                                  </StyledTableCell>
                                );
                              })}
                            </TableRow>
                          ) : (
                            <TableRow hover tabIndex={-1} key={index}>
                              {columns.map((column) => {
                                const value = row[column.id];

                                return (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id == "date"
                                      ? getFormattedDate(value)
                                      : value}
                                  </StyledTableCell>
                                );
                              })}
                            </TableRow>
                          )}
                        </>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>

          {tableRows.length > 0 && (
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
            (!tableRows ||
              (tableRows.length === 0 && <NoRecordsFound open={status} />))}
        </Paper>
      )}

      {status &&
        (!tableRows ||
          (tableRows.length === 0 && (
            <Typography className="no-record-found">No Record Found</Typography>
          )))}
    </>
  );
}

/**
 * @description Customized Table Pagination
 *
 * @param {Object} props
 * @returns
 */
interface TablePaginationInterface {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: any;
}

const TablePaginationActions = (props: object) => {
  const { count, page, rowsPerPage, onPageChange } =
    (props as TablePaginationInterface) || {};

  const { batchPageData }: any = useSelector(
    ({ batch }: { batch: object }) => batch
  );

  const localPage = isBatchSearch
    ? batchPageData.batchSearchPage
    : batchPageData.batchFileSearchPage;

  return (
    <PaginationActions
      count={count}
      localPage={localPage}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
    />
  );
};

/**
 * Custom styling
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  cursor: "pointer",
  // textDecoration: "underline",
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90px",
}));
