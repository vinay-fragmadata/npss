/**
 * @description types of user roles while logged in
 */
export const USER_ROLES = {
  OPS: { label: "OPS", value: "OPS" },
  READ: { label: "READ", value: "READ" },
};

/**
 * Input fields dropdown
 */
export const processOptions = ["Credit Transfer", "Request", "Reversal"];
export const isBatchOptions = ["YES", "NO"];
export const DIRECTION_OPTIONS = ["IN", "OUT"];

/**
 * Batch fields dropdown
 */
export const FILE_TYPE = ["XML", "CSV"];
export const MESSAGE_TYPE = ["PACS002", "PACS004", "PACS008"];
export const TRANSACTION_TYPE = ["Credit Transfer", "Payment Return"];

/**
 * Search result Table columns
 */
export const columns = [
  // { id: "id", label: "Sr No.", minWidth: 40, align: "left" },
  { id: "checkbox", label: "", minWidth: 40, align: "left" },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "transactionRefNum",
    label: "Transaction Ref No",
    minWidth: 170,
    align: "left",
  },
  { id: "process", label: "Process", minWidth: 100 },
  {
    id: "direction",
    label: "Direction",
    minWidth: 70,
    align: "left",
    // format: (value) => value.toLocaleString("en-US"),
  },

  // {
  //   id: "flexIPPRefNum",
  //   label: "Flex IPP Ref No",
  //   minWidth: 170,
  //   align: "left",
  // },
  {
    id: "internalPaymentInstructionId",
    label: "Payment Instruction ID",
    minWidth: 70,
    align: "left",
  },

  { id: "status", label: "Status", minWidth: 100 },
];

/**
 * Transaction Report Data
 */
export const TRANSACTION_FLEX_DATA = {
  BLOCK_DETAILS: {
    label: "Block Details",
    value: "BLOCK_DETAILS",
    subTitle: "",

    rows: [
      {
        BLOCK_ID: "1",
        BLOCK_REQ_START_TIME: "20/12/2022 10:15:33",
        BLOCK_REQ_END_TIME: "20/12/2023 10:15:33",
        BLOCK_STATUS: "Active",
      },
    ],

    data: {
      BLOCK_ID: {
        label: "Block ID",
        value: "BLOCK_ID",
        id: "BLOCK_ID",
        data: "1",
      },
      BLOCK_REQ_START_TIME: {
        label: "Block Request Start Time",
        value: "BLOCK_REQ_START_TIME",
        id: "BLOCK_REQ_START_TIME",
        data: "20/12/2022 10:15:33",
      },
      BLOCK_REQ_END_TIME: {
        label: "Block Request End Time",
        value: "BLOCK_REQ_END_TIME",
        id: "BLOCK_REQ_END_TIME",
        data: "20/12/2023 10:15:33",
      },
      BLOCK_STATUS: {
        label: "Block Status",
        value: "BLOCK_STATUS",
        id: "BLOCK_STATUS",
        data: "Active",
      },
    },
  },

  UNBLOCK_DETAILS: {
    label: "Unblock Details",
    value: "UNBLOCK_DETAILS",
    subTitle: "",

    rows: [
      {
        UNBLOCK_ID: "1",
        UNBLOCK_REQ_START_TIME: "20/12/2022 10:15:33",
        UNBLOCK_REQ_END_TIME: "20/12/2023 10:15:33",
        UNBLOCK_STATUS: "Active",
      },
    ],

    data: {
      UNBLOCK_ID: { label: "Block ID", value: "UNBLOCK_ID", data: "1" },
      UNBLOCK_REQ_START_TIME: {
        label: "Unblock Request Start Time",
        value: "UNBLOCK_REQ_START_TIME",
        data: "20/12/2022 10:15:33",
      },
      UNBLOCK_REQ_END_TIME: {
        label: "Unblock Request End Time",
        value: "UNBLOCK_REQ_END_TIME",
        data: "20/12/2023 10:15:33",
      },
      UNBLOCK_STATUS: {
        label: "Unblock Status",
        value: "UNBLOCK_STATUS",
        data: "Active",
      },
    },
  },

  UNBLOCK_TRANSFER_DETAILS: {
    label: "Unblock Transfer Details",
    value: "UNBLOCK_TRANSFER_DETAILS",
    subTitle: "",
    rows: [
      {
        UNBLOCK_TRANSFER_ID: "1",
        UNBLOCK_TRANSFER_REQ_START_TIME: "21/12/2022 11:15:33",
        UNBLOCK_TRANSFER_REQ_END_TIME: "22/12/2023 09:15:33",
        UNBLOCK_TRANSFER_STATUS: "Active",
      },
    ],
    data: {
      UNBLOCK_TRANSFER_ID: {
        label: "Block ID",
        value: "UNBLOCK_TRANSFER_ID",
        data: "1",
      },
      UNBLOCK_TRANSFER_REQ_START_TIME: {
        label: "Unblock Transfer Request Start Time",
        value: "UNBLOCK_TRANSFER_REQ_START_TIME",
        data: "21/12/2022 11:15:33",
      },
      UNBLOCK_TRANSFER_REQ_END_TIME: {
        label: "Unblock Transfer Request End Time",
        value: "UNBLOCK_TRANSFER_REQ_END_TIME",
        data: "22/12/2023 09:15:33",
      },
      UNBLOCK_TRANSFER_STATUS: {
        label: "Unblock Transfer Status",
        value: "UNBLOCK_TRANSFER_STATUS",
        data: "Active",
      },
    },
  },

  CREDIT_DETAILS: {
    label: "Credit Details",
    value: "CREDIT_DETAILS",
    subTitle: "",
    rows: [
      {
        CREDIT_ID: "1",
        CREDIT_REQ_START_TIME: "20/12/2022 10:15:33",
        CREDIT_REQ_END_TIME: "21/12/2023 10:15:33",
        CREDIT_STATUS: "Active",
      },
    ],
    data: {
      CREDIT_ID: { label: "Credit ID", value: "CREDIT_ID", data: "1" },
      CREDIT_REQ_START_TIME: {
        label: "Credit Request Start Time",
        value: "CREDIT_REQ_START_TIME",
        data: "20/12/2022 10:15:33",
      },
      CREDIT_REQ_END_TIME: {
        label: "Credit Request End Time",
        value: "CREDIT_REQ_END_TIME",
        data: "21/12/2023 10:15:33",
      },
      CREDIT_STATUS: {
        label: "Credit Status",
        value: "CREDIT_STATUS",
        data: "Active",
      },
    },
  },
};

/**
 * PAC messages Header
 */
export const PAC_MESSAGES_HEADER = [
  {
    id: "messageType",
    label: "Message Type",
    value: "messageType",
    minWidth: 100,
    align: "left",
  },
  {
    id: "messageDateTime",
    label: "Message Date Time",
    value: "messageDateTime",
    minWidth: 120,
    align: "left",
  },
  {
    id: "direction",
    label: "Direction",
    value: "direction",
    minWidth: 100,
    align: "left",
  },
  {
    id: "pacsMessage",
    label: "PACS Message",
    value: "pacsMessage",
    minWidth: 170,
    align: "left",
  },
];

/**
 * PAC messages rows
 */
// export const PAC_MESSAGES_DATA = [
//   {
//     messageType: "PACS008",
//     messageDateTime: "01/09/2020 10:15:15",
//     direction: "OUT",
//     pacsMessage: { type: "XML", xml: PAC008 },
//   },
//   {
//     messageType: "PACS002",
//     messageDateTime: "11/09/2020 10:15:15",
//     direction: "IN",
//     pacsMessage: { type: "XML", xml: PAC002 },
//   },
// ];

/**
 * FLEX DETAILS HEADERS
 */
export const FLEX_DETAILS_HEADERS = [
  { label: "IPP Ref No.", value: "ippRefNumber", minWidth: 45, align: "left" },
  {
    label: "Transaction Type",
    value: "transactionType",
    minWidth: 40,
    align: "left",
  },
  // {
  //   label: "Transaction Amount",
  //   value: "transactionAmount",
  //   minWidth: 40,
  //   align: "left",
  // },
  {
    label: "Operation Start Time",
    value: "startDateTime",
    minWidth: 45,
    align: "left",
  },
  {
    label: "Operation End Time",
    value: "endDateTime",
    minWidth: 45,
    align: "left",
  },
  {
    label: "Flex Call Status",
    value: "transactionStatus",
    minWidth: 40,
    align: "left",
  },
  {
    label: "Failure Reason",
    value: "failureReason",
    minWidth: 40,
    align: "left",
  },
  { label: "XVAT Ref No.", value: "xvatRefNo", minWidth: 40, align: "left" },
  { label: "OMW Ref No.", value: "omwRefNumber", minWidth: 45, align: "left" },
];

/**
 * FLEX DETAILS ROWS
 */
// export const FLEX_DETAILS_ROWS = [
//   {
//     ippRefNumber: "9163",
//     transactionType: "Credit",
//     transactionAmount: "10",
//     startDateTime: "2022-12-03T11:55:34.696Z",
//     endDateTime: "2022-12-31T11:55:34.696Z",
//     transactionStatus: "A",
//     failureReason: "NA",
//     xvatRefNo: "033IPPC230270022",
//     omwRefNumber: "9171",
//   },
//   {
//     ippRefNumber: "9157",
//     transactionType: "Block",
//     transactionAmount: "10",
//     startDateTime: "2022-12-05T11:55:34.696Z",
//     endDateTime: "2022-12-31T11:55:34.696Z",
//     transactionStatus: "A",
//     failureReason: null,
//     xvatRefNo: null,
//     omwRefNumber: "9160",
//   },
// ];

/**
 * Dashboard default form data
 */
export const DEFAULT_SEARCH_TRANSACTION_DATA = {
  transactionRefNo: null,
  ourIbanNumber: null,
  otherBankCode: null,
  otherBankIban: null,
  direction: null,
  process: null,
  isBatch: null,
  startDate: null,
  endDate: null,
};

/**
 * Dashboard default form data
 */
export const DEFAULT_DASHBOARD_DATA_OLD = {
  transactionRefNo: null,
  ourIbanNumber: null,
  otherBankCode: null,
  otherBankIban: null,
  direction: null,
  process: null,
  isBatch: null,
  startDate: null,
  endDate: null,
};

/**
 * Dashboard UI
 */
export const CARD_DUMMY_DATA = {
  volume: {
    title: "Volume",
    data: [
      { label: "IN", value: "50" },
      { label: "OUT", value: "75" },
      { label: "TOTAL", value: "125" },
    ],
  },
  amount: {
    title: "Amount (AED)",
    data: [
      { label: "IN", value: "50000" },
      { label: "OUT", value: "45000" },
      { label: "TOTAL", value: "95000" },
    ],
  },
};

/**
 * Batch default form data
 */
export const DEFAULT_BATCH_DATA = {
  startDate: null,
  endDate: null,
  direction: "",

  // batch search
  transactionType: "",

  // Batch file search
  fileType: "",
  messageType: "",
};

/**
 * @description Notification Data
 */
export const DEFAULT_NOTIFICATION = {
  isError: false,
  msgType: "",
  msg: "",
  statusCode: "",
  failedMsgTitle: "",
  isFailedButtonShow: false,
};

/**
 * @description Button Texts
 */
export const BUTTON_TEXTS = {
  SEARCH: "Search",
  CLEAR: "Clear",
  RETURN: "Return",
  REV: "Reversal",
};

/**
 * @description Titles used in project
 */
export const TITLES = {
  // Common titles
  RESULT: "Results",
  FILTERS: "Filters",

  // Dashboard page
  DASHBOARD: "Dashboard",

  // Search Transaction page
  SEARCH_TRANSACTION: "Search Transaction",

  // Transaction Report page
  TRANSACTION_REPORT: {
    label: "Transaction Report",
    overview: "Overview",
    debitor_details: "Debitor Details",
    creditor_details: "Creditor Details",
    payment_id: "Payment IDs",
  },
  FLEX_DETAILS: {
    label: "Flex Details",
  },
  PACS_MSG: {
    label: "PACS Messages",
  },

  // "Batch Search"
  BATCH: {
    BATCH_SEARCH: "Batch Search",
    BATCH_FILE_SEARCH: "Batch File Search",
  },

  CONFIRMATION_TITLE: {
    return_title: "What is reason for return?",
    rev_title: "Confirm Reversal",
  },
};
