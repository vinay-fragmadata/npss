import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  MONTH_TILL_DATE,
  PREVIOUS_MONTH,
  YESTERDAY,
} from "../../pages/Dashboard/configs";
import { getStringWithSpclChar } from "../../utils/helper/getFormattedString";

import { StyledTableCell } from "../../styledComponents/StyledTableCell";
import "./style.scss";

/**
 * @interfaces
 */
interface IMultiHeaderAndRow {
  headers: any[];
  rows: any[];
  isMultipleHeader: boolean;
  isMultipleRow: boolean;
  rowCount: number;
}

interface IHeaderCell {
  colSpan: number | string | any;
  align: string | string | any;
  minWidth: number | string;
  label: string | number;
}

/**
 * @description Component
 * @param {Object} props
 * @returns
 */
const MultiHeaderRowTable = (props: object) => {
  const {
    headers = [],
    rows = [],
    isMultipleHeader = false,
    isMultipleRow = false,
    rowCount = 0,
  } = props as IMultiHeaderAndRow;

  const getClassName = (
    cellIndex: number,
    label: string | number,
    header: boolean
  ) => {
    if (cellIndex == 2) return true;
    if (isMultipleRow) {
      if (cellIndex == 0 && label == "In") {
        return header ? "multi-col-class-1" : `multi-row-class-1`;
      }
      if (cellIndex == 0) {
        return header ? "multi-col-class" : "multi-row-class";
      }

      if (cellIndex == 1 && typeof label != "number") {
        return header ? "multi-col-class-1" : `multi-row-class-1`;
      }
    } else if (rowCount > cellIndex) {
      return "status-class";
    }
  };

  return (
    <TableContainer sx={{ maxHeight: 440 }} className="table-container">
      <Table stickyHeader aria-label="sticky table">
        {isMultipleHeader && (
          <TableHead className="sticky-header">
            {headers.map((headerRow, rowIndex) => (
              <TableRow key={rowIndex} className="header-table-row">
                {headerRow.map((headerCell: object, cellIndex: number) => {
                  const {
                    colSpan = 1,
                    align = "",
                    minWidth = "",
                    label = "",
                  } = (headerCell as IHeaderCell) || {};

                  return (
                    <StyledTableCell
                      key={cellIndex}
                      colSpan={colSpan}
                      align={align}
                      style={{ minWidth: minWidth }}
                      className={getClassName(cellIndex, label, true)}
                    >
                      {label}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
        )}

        {isMultipleRow && (
          <TableBody>
            {rows.map((row: string[], rowIndex: number) => (
              <TableRow key={rowIndex} className="table-row">
                {row.map((cell: string, cellIndex: number) => {
                  return cell == YESTERDAY ||
                    cell == MONTH_TILL_DATE ||
                    cell == PREVIOUS_MONTH ? (
                    <StyledTableCell
                      rowSpan={2}
                      key={cellIndex}
                      className={`${getStringWithSpclChar(
                        cell,
                        "-"
                      )} ${getClassName(cellIndex, cell, false)}`}
                    >
                      {cell}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell
                      key={cellIndex}
                      className={`${getStringWithSpclChar(
                        cell,
                        "-"
                      )} ${getClassName(cellIndex, cell, false)}`}
                    >
                      {cell}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        )}

        {!isMultipleRow && (
          <TableBody>
            {rows.map((row: string[], rowIndex: number) => (
              <TableRow key={rowIndex} className="table-row">
                {row.map((cell: string, cellIndex: number) => {
                  return (
                    <StyledTableCell
                      key={cellIndex}
                      className={`${getStringWithSpclChar(cell, "-")} ${
                        cellIndex == 0 ? "status-class" : "normal-cell"
                      }`}
                    >
                      {cell}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default MultiHeaderRowTable;
