import React from "react";
import { string, arrayOf, number } from "prop-types";

import { Paper, Box } from "@mui/material";
import Title from "../../../components/Title";
import MultiHeaderRowTable from "../../../components/MultiHeaderRowTable";
import {
  IN,
  MONTH_TILL_DATE,
  OUT,
  PREVIOUS_MONTH,
  SUCCESS_TRANSACTION_HEADERS,
  YESTERDAY,
} from "../configs";

/**
 * @description Component
 * @param {Object} props
 * @returns
 */
const TatReports = ({ title = "Results", rowsData = [] }) => {
  const [formattedRowsData, setFormattedRows] = React.useState([]);

  /**
   * @description Formatting Row with Row Title
   * @param rows
   */
  const formattedRows = (rows: Array<any>) => {
    SUCCESS_TRANSACTION_HEADERS[1].map(({ label }: { label: string }) => {
      const [, secondArr] = SUCCESS_TRANSACTION_HEADERS;
      const [PERIOD] = secondArr;
      const { label: PERIOD_LABEL } = PERIOD;

      return rows.forEach((row: any, rowIndex: number) => {
        if (label == PERIOD_LABEL) {
          if (rowIndex % 2 === 0) {
            row.unshift(OUT);
          } else {
            row.unshift(IN);
          }

          if (rowIndex === 0) {
            row.unshift(YESTERDAY);
          } else if (rowIndex === 2) {
            row.unshift(MONTH_TILL_DATE);
          } else if (rowIndex === 4) {
            row.unshift(PREVIOUS_MONTH);
          }
        }
      });
    });
  };

  /**
   * @description Extracting rows and formatting
   */
  React.useLayoutEffect(() => {
    formattedRows(rowsData);
    setFormattedRows(rowsData);
  }, [rowsData]);

  return (
    <>
      <Box style={searchResult}>
        <Box className="result-title">
          <Title title={title} />
        </Box>

        <Paper
          sx={{ width: "100%", overflow: "hidden" }}
          className="table-container"
          data-testid="transaction-id"
        >
          <MultiHeaderRowTable
            headers={SUCCESS_TRANSACTION_HEADERS}
            isMultipleHeader={true}
            isMultipleRow={true}
            rows={formattedRowsData}
            rowCount={2}
          />
        </Paper>
      </Box>
    </>
  );
};

/**
 * @description Prop validation
 */
TatReports.propType = {
  title: string,
  rowsData: arrayOf(number),
};

/**
 * @description Default Prop
 */
TatReports.defaultProps = {
  title: "Results",
  rowsData: [],
};

export default TatReports;

/**
 * Custom Styling
 */
const searchResult = {
  width: "100%",
  marginTop: "5%",
};
