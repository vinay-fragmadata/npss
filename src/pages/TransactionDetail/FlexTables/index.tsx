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

export default function Tables({
  columns = [],
  rows = [],
}: {
  columns: any[];
  rows: any[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any | any
  ) => {
    setRowsPerPage(+event?.target?.value);
    setPage(0);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | any,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={`${column.id}-${index}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={`${row.id}-${index}`}>
                    {columns.map((column, index) => {
                      const value = row[column.value];

                      return (
                        <StyledTableCell
                          key={`${column.id}-${index}`}
                          align={column.align}
                        >
                          {value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length > 5 && (
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
  [`&.${tableCellClasses.head}`]: {
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
