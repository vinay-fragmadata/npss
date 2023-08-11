import React from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { StyledDashboardCardHeader, StyledTableCell } from "../styledComponent";

export default function DashboardTable({
  columns = [],
  rows = [],
  title,
}: {
  columns: any[];
  rows: any[];
  title: string;
}) {
  return (
    <Paper
      sx={{ width: "48%", overflow: "hidden" }}
      data-test-id="dashboard-table-id"
    >
      <StyledDashboardCardHeader
        sx={{ fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        {title}
      </StyledDashboardCardHeader>
      <StyledTableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index} className="table">
                  {columns.map((column, index) => {
                    const value = row[column.value];

                    return (
                      <StyledTableCell
                        key={`${index}`}
                        align={column.align}
                        className={"withoutXML"}
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
      </StyledTableContainer>
    </Paper>
  );
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  margin: "5%",
  marginTop: "6%",
  width: "auto",
}));
