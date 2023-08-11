/**
 * Overview Details data
 */
export const OVERVIEW_DETAILS = {
  internalTransactionId: { label: "Transaction Reference No.", value: "" },
  interBankSettlementAmount: {
    label: "InterBank Settlement Amount",
    value: "",
  },
  isReturn: { label: "Is Returned", value: "" },
  isReversalRequested: { label: "Is Reversal Requested", value: "" },
  overAllStatus: { label: "Overall Status", value: "" },
  acceptanceDateTime: { label: "Acceptance Date and Time", value: "" },
  transactionReference: { label: "Transaction Reference", value: "" },
  returnPaymentId: { label: "Return Payment IDs", value: "returnPaymentId" },
  reversalRequestId: {
    label: "Reversal Request IDs",
    value: "reversalRequestId",
  },
};

/**
 * Debitor Details data
 */
export const DEBITOR_DETAILS = {
  debitorAccountNumber: { label: "Account Number", value: "" },
  debitorName: { label: "Name", value: "" },
  debitorIban: { label: "IBAN", value: "" },
  debitorBICFI: { label: "BICFI", value: "" },
};

/**
 * Creditor Details data
 */
export const CREDITOR_DETAILS = {
  creditorAccountNumber: { label: "Account Number", value: "" },
  creditorName: { label: "Name", value: "" },
  creditorIban: { label: "IBAN", value: "" },
  creditorBICFI: { label: "BICFI", value: "" },
};

/**
 * Payment Details data
 */
export const PAYMENT_ID_DETAILS = {
  endToEndId: { label: "End to End ID", value: "" },
  instrId: { label: "Instruction ID", value: "" },
  transactionId: { label: "Transaction ID", value: "" },
  uetr: { label: "UETR", value: "" },
  clrsysref: { label: "Clearing System Ref", value: "" },
};

/**
 * PAC message data
 */
export const PAC_MESSAGES_DATA = {
  messageType: "",
  messageDateTime: "",
  direction: "",
  pacsMessage: { type: "XML", xml: "" },
};

/**
 * Fake data
 */
export const DUMMY_REASONS = {
  reasonA: { label: "Reason A", value: "reasonA" },
  reasonB: { label: "Reason B", value: "reasonB" },
  reasonC: { label: "Reason C", value: "reasonC" },
  reasonD: { label: "Reason D", value: "reasonD" },
};
