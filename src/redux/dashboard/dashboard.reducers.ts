import { RESET_STATE } from "../global/constants";
import {
  SET_DASHBOARD_SUMMARY,
  SET_SINGLE_TRANSACTION,
  SET_TRANSACTION_ID,
  SET_TRANSACTION_TABLE_DATA,
} from "./dashboard.constant";

export const INITIAL_STATE = {
  transactionSummary: {},
  transactionID: 0,
  singleTransaction: {},
  dashboardTransactionTableData: [],
};

interface actionsInterface {
  type: string;
  value: string;
}

const dashboardReducer = (state = INITIAL_STATE, action: object) => {
  const { type, value } = action as actionsInterface;
  switch (type) {
    case SET_DASHBOARD_SUMMARY:
      return { ...state, transactionSummary: value };

    case SET_TRANSACTION_TABLE_DATA:
      return { ...state, dashboardTransactionTableData: value };

    case SET_TRANSACTION_ID:
      return { ...state, transactionID: value };

    case SET_SINGLE_TRANSACTION:
      return { ...state, singleTransaction: value };

    case RESET_STATE:
      return INITIAL_STATE;

    default:
      return { ...state };
  }
};

export default dashboardReducer;
