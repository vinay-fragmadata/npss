import React, { useState, useLayoutEffect } from "react";
import { string, arrayOf, number } from "prop-types";
import { Paper, Box } from "@mui/material";

import { VOLUME_REPORT_HEADERS, VOLUME_SUCCESS_ROWS } from "../configs";
import MultiHeaderRowTable from "../../../components/MultiHeaderRowTable";
import Title from "../../../components/Title";

/**
 * @description Component
 * @param {Object} props
 * @returns
 */
const VolumeReport = ({ title = "Results", rowsData = [] }) => {
  const [formattedRowsData, setFormattedRows] = useState([]);

  /**
   * @description Formatting Row with Row Title
   * @param rows
   */
  const formattedRows = async (rows: any[]) => {
    return await rows.map((row: any[], index: number) => {
      return Object.values(VOLUME_SUCCESS_ROWS).map(
        ({ label }: { label: string }, volIndex: number) => {
          if (index == volIndex) {
            row.unshift(label);
            return [label, ...row];
          }
        }
      );
    });
  };

  /**
   * @description Extracting rows and formatting
   */
  useLayoutEffect(() => {
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
            headers={VOLUME_REPORT_HEADERS}
            rows={formattedRowsData}
            isMultipleHeader={true}
            isMultipleRow={false}
            rowCount={1}
          />
        </Paper>
      </Box>
    </>
  );
};

/**
 * @description Prop validation
 */
VolumeReport.propType = {
  title: string,
  rowsData: arrayOf(number),
};

/**
 * @description Default Prop
 */
VolumeReport.defaultProps = {
  title: "Results",
  rowsData: [],
};

export default VolumeReport;

/**
 * @description Custom Styling
 */
const searchResult = {
  width: "100%",
  marginTop: "5%",
};
