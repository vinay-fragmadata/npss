export const YESTERDAY = "Yesterday";
export const MONTH_TILL_DATE = "Month Till Date";
export const PREVIOUS_MONTH = "Previous Month";

export const OUT = "Out";
export const IN = "In";

export const VOLUME_REPORT_HEADERS = [
  [
    { label: "", colSpan: 1, align: "center" },
    { label: "OUT", colSpan: 6, align: "center" },
    { label: "IN", colSpan: 6, align: "center" },
  ],
  [
    { label: "", colSpan: 1, align: "center" },
    { label: "Yesterday", colSpan: 2, align: "center" },
    { label: "MTD", colSpan: 2, align: "center" },
    { label: "Previous Month", colSpan: 2, align: "center" },
    { label: "Yesterday", colSpan: 2, align: "center" },
    { label: "MTD", colSpan: 2, align: "center" },
    { label: "Previous Month", colSpan: 2, align: "center" },
  ],
  [
    { label: "Status", colSpan: 1, align: "left", minWidth: 200 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Volume", colSpan: 1, align: "left", minWidth: 30 },
    { label: "Amount", colSpan: 1, align: "left", minWidth: 30 },
  ],
];

// Not in use-- just dummy data
export const VOLUME_REPORT_ROWS = [
  [87, 887, 18.7, 287, 45, 0.8, 789, 567, 755, 334, 222, 55],
  [686, 686, 686, 686, 567, 25, 987, 686, 686, 686, 686, 686],
  [6.86, 66, 86, 686, 567, 25, 987, 686, 686, 686, 686, 686],
  [68.6, 68, 686, 686, 567, 25, 987, 686, 686, 686, 686, 686],
  [186, 86, 686, 686, 567, 25, 987, 686, 686, 686, 686, 686],
  [7.86, 66, 686, 686, 567, 25, 987, 686, 686, 686, 686, 686],
  [586, 586, 686, 686, 567, 25, 987, 686, 686, 686, 686, 686],
];

/**
 * @description Volume Success Rows Title
 *  dummy data-- not in use
 */
export const VOLUME_SUCCESS_ROWS = {
  SUCCESSFUL: {
    value: "SUCCESSFUL",
    label: "Successful",
    minWidth: 40,
    classFlow: "volume-class success",
  },
  VALIDATION_REJ: {
    value: "VALIDATION_REJ",
    label: "Validation Rejects Before Sending to CB",
    classFlow: "volume-class validation",
  },
  SYS_FAIL_B4_SEND: {
    value: "SYS_FAIL_B4_SEND",
    label: "System Failure Before Sending to CB",
    classFlow: "volume-class failure",
  },
  REJECT_RES: {
    value: "REJECT_RES",
    label: "Reject Response from CB",
    classFlow: "volume-class reject",
  },
  FAILURE_RES: {
    value: "FAILURE_RES",
    label: "Failure After Receiving Response from CB",
    classFlow: "volume-class failure",
  },
  RETRY_AFTER_FAIL: {
    value: "RETRY_AFTER_FAIL",
    label: "In Retry After Failure from CB",
    classFlow: "volume-class failure",
  },
  NO_RES_CB: {
    value: "NO_RES_CB",
    label: "Failure (No Response From CB)",
    classFlow: "volume-class failure",
  },
};

/**
 * @description Success Transaction Headers
 */
export const SUCCESS_TRANSACTION_HEADERS = [
  [
    { label: "", colSpan: 1, align: "center", minWidth: 100 },
    { label: "", colSpan: 1, align: "center", minWidth: 40 },
    {
      label: "TAT (in milliSeconds)",
      colSpan: 9,
      align: "center",
      minWidth: 40,
    },
  ],
  [
    { label: "Period", colSpan: 1, align: "center", minWidth: 40 },
    { label: "Direction", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P25", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P50", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P75", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P90", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P95", colSpan: 1, align: "center", minWidth: 40 },
    { label: "P99", colSpan: 1, align: "center", minWidth: 40 },
    { label: "Max", colSpan: 1, align: "center", minWidth: 40 },
    { label: "Min", colSpan: 1, align: "center", minWidth: 40 },
    { label: "Avg", colSpan: 1, align: "center", minWidth: 40 },
  ],
];

// Not in use-- just dummy data
/**
 * @description Dummy Success Transaction rows data
 */
export const SUCCESS_TRANSACTION_ROWS = [
  [147, 887, 18.7, 287, 45, 0.8, 789, 567, 755],
  [236, 686, 686, 686, 567, 25, 987, 686, 686],
  [1.86, 66, 86, 686, 567, 25, 987, 686, 686],
  [648.6, 68, 686, 686, 567, 25, 987, 686, 686],
  [306, 66, 86, 686, 567, 25, 987, 686, 686],
  [968, 68, 686, 686, 567, 25, 987, 686, 686],
];
