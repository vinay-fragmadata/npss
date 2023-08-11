import { RESET_STATE } from "../global/constants";
import {
  SET_CREDITOR_DETAILS,
  SET_DEBITOR_DETAILS,
  SET_FLEX_DETAILS,
  SET_OVERVIEW_DETAILS,
  SET_PACS_MESSAGES,
  SET_PAYMENT_ID_DETAILS,
} from "./constants";

/**
 * @description Initial state of states
 */
export const INITIAL_STATE = {
  overviewData: {},
  debitorDetails: {},
  creditorDetails: {},
  paymentIDsDetails: {},
  flexDetails: [],
  pacsMessages: [],
};

interface actionsInterface {
  type: string;
  value: string;
}

const transactionDetailReducer = (
  state: object = INITIAL_STATE,
  action: object
) => {
  const { type, value } = (action as actionsInterface) || {};

  switch (type) {
    case SET_OVERVIEW_DETAILS:
      return { ...state, overviewData: value };

    case SET_DEBITOR_DETAILS:
      return { ...state, debitorDetails: value };

    case SET_CREDITOR_DETAILS:
      return { ...state, creditorDetails: value };

    case SET_PAYMENT_ID_DETAILS:
      return { ...state, paymentIDsDetails: value };

    case SET_FLEX_DETAILS:
      return { ...state, flexDetails: value };

    case SET_PACS_MESSAGES:
      return { ...state, pacsMessages: value };

    case RESET_STATE:
      return INITIAL_STATE;

    default:
      return { ...state };
  }
};

export default transactionDetailReducer;
