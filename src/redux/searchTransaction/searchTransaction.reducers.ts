import { RESET_STATE } from "../global/constants";
import {
  SET_SEARCH_TRANSACTION_FORMDATA,
  SET_SEARCH_TRANSACTION_SUMMARY,
  SET_SELECTED_TRANSACTIONS_ID,
  SET_SINGLE_TRANSACTION,
  SET_TRANSACTION_ID,
  SET_TRANSACTION_TABLE_DATA,
} from "./searchTransaction.constant";

export const INITIAL_STATE = {
  transactionSummary: {},
  transactionID: 0,
  singleTransaction: {},
  searchTransactionFormData: {},
  searchTransactionTableData: [],
  selectedTransactionIDs: [],
};

interface actionsInterface {
  type: string;
  value: string;
}

const searchTransactionReducer = (state = INITIAL_STATE, action: object) => {
  const { type, value } = action as actionsInterface;

  switch (type) {
    case SET_SEARCH_TRANSACTION_SUMMARY:
      return { ...state, transactionSummary: value };

    case SET_TRANSACTION_TABLE_DATA:
      return { ...state, searchTransactionTableData: value };

    case SET_TRANSACTION_ID:
      return { ...state, transactionID: value };

    case SET_SINGLE_TRANSACTION:
      return { ...state, singleTransaction: value };

    case SET_SEARCH_TRANSACTION_FORMDATA:
      return { ...state, searchTransactionFormData: value };

    case SET_SELECTED_TRANSACTIONS_ID:
      return { ...state, selectedTransactionIDs: value };

    case RESET_STATE:
      return INITIAL_STATE;

    default:
      return { ...state };
  }
};

export default searchTransactionReducer;
