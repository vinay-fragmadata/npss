import React from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import beautify from "xml-beautifier";

import CustomizedDialogs from "../CustomizedDialogs";

import { getFormattedDate } from "../../utils/helper/getFormattedDateAndTime";
import "./style.css";

export default function CustomizedTables({
  columns = [],
  rows = [],
}: {
  columns: any[];
  rows: any[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [xmlModal, setXMLModal] = React.useState(null);
  const [openXMLModal, setOpenXML] = React.useState(false);

  const handleChangeRowsPerPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any | any
  ) => {
    setRowsPerPage(+event?.target?.value);
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    newPage: number
  ) => {
    setPage(newPage);
  };

  /**
   * @description Get XML Data
   *
   * @param {Object} rowData
   * @returns
   */
  const getXMLData = (xml: string) => (_: object) => {
    setXMLModal(beautify(xml));
    setOpenXML(true);
  };

  const handleClose = () => {
    setOpenXML(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <CustomizedDialogs
        title={""}
        open={openXMLModal}
        onClose={handleClose}
        msg={xmlModal}
        actionType={["download"]}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column?.id}
                  align={column?.align}
                  style={{ minWidth: column?.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id} className="table">
                    {columns.map((column, index) => {
                      const value = row[column.id];

                      return (
                        <StyledTableCell
                          key={`${column.id}-${row.id}-${index}`}
                          align={column.align}
                          className={
                            column?.id === "pacsMessage"
                              ? "withXML"
                              : "withoutXML"
                          }
                          onClick={
                            column?.id === "pacsMessage"
                              ? getXMLData(value)
                              : null
                          }
                        >
                          {column?.id === "pacsMessage"
                            ? "XML TEXT"
                            : column.id == "messageDateTime"
                            ? getFormattedDate(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

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
