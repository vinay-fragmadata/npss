/**
 * Search result for batch Table columns
 */
export const SINGLE_BATCH_HEADERS = [
  { id: "batchId", label: "Batch ID", minWidth: 50 },
  { id: "transactionType", label: "Transaction Type", minWidth: 80 },
  {
    id: "direction",
    label: "Direction",
    minWidth: 80,
    align: "left",
  },
  {
    id: "createdOn",
    label: "Created On",
    minWidth: 80,
    align: "left",
  },

  // {
  //   id: "numberOfInstructions",
  //   label: "No. of instructions",
  //   minWidth: 80,
  //   align: "left",
  // },

  // { id: "successTransactions", label: "Success Transaction", minWidth: 80 },
  // { id: "failedTransactions", label: "Failed Transaction", minWidth: 80 },
  // {
  //   id: "systemFailureTransactions",
  //   label: "System Failure Transaction",
  //   minWidth: 80,
  // },
  { id: "processingStatus", label: "Processing Status", minWidth: 80 },
];

export const SINGLE_BATCH_ROWS = [
  {
    batchId: "234",
    transactionType: "Credit",
    direction: "OUT",
    createdOn: "2023-01-10",
    numberOfInstructions: "23",
    successTransactions: "23",
    failedTransactions: "56",
    systemFailureTransactions: "789",
    processingStatus: "Active",
  },
  {
    batchId: "12",
    transactionType: "Credit",
    direction: "IN",
    createdOn: "2022-12-10",
    numberOfInstructions: "21",
    successTransactions: "22",
    failedTransactions: "16",
    systemFailureTransactions: "89",
    processingStatus: "Active",
  },
];

export const BATCH_FILE_SEARCH_HEADERS = [
  { id: "fileId", label: "File ID", minWidth: 50, align: "left" },
  { id: "batchId", label: "Batch ID", minWidth: 50, align: "left" },
  { id: "fileName", label: "File Name", minWidth: 50, align: "left" },
  { id: "fileStatus", label: "File Status", minWidth: 80, align: "left" },
  { id: "fileType", label: "File Type", minWidth: 50, align: "left" },
  { id: "messageType", label: "Message Type", minWidth: 80, align: "left" },
  { id: "receivedOn", label: "Received On", minWidth: 80, align: "left" },
  { id: "direction", label: "Direction", minWidth: 50, align: "left" },
  // {
  //   id: "numberOfInstructions",
  //   label: "No. of Instructions",
  //   minWidth: 80,
  //   align: "left",
  // },
  // {
  //   id: "successTransactions",
  //   label: "Success Transactions",
  //   minWidth: 80,
  //   align: "left",
  // },
  // {
  //   id: "failedTransactions",
  //   label: "Failed Transactions",
  //   minWidth: 80,
  //   align: "left",
  // },
  // {
  //   id: "systemFailureTransactions",
  //   label: "System Failure Transactions",
  //   minWidth: 80,
  //   align: "left",
  // },

  { id: "processingStatus", label: "processing Status", minWidth: 80 },
];

export const SET_BATCH_FILE_SEARCH_ROWS = [
  {
    fileId: "123",
    batchId: "456",
    fileName: "PAC-23",
    fileStatus: "Active",
    fileType: "XML",
    messageType: "Success",
    receivedOn: "2023-02-21",
    direction: "IN",
    numberOfInstructions: "23",
    successTransactions: "10",
    failedTransactions: "10",
    systemFailureTransactions: "3",
    processingStatus: "Active",
  },
  {
    fileId: "5678",
    batchId: "1478",
    fileName: "PAC-678",
    fileStatus: "Pending",
    fileType: "CSV",
    messageType: "Pending",
    receivedOn: "2023-02-14",
    direction: "OUT",
    numberOfInstructions: "13",
    successTransactions: "8",
    failedTransactions: "2",
    systemFailureTransactions: "3",
    processingStatus: "Rejected",
  },
];
