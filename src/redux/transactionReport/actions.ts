import { RESET_STATE } from "../global/constants";
import {
  SET_CREDITOR_DETAILS,
  SET_DEBITOR_DETAILS,
  SET_FLEX_DETAILS,
  SET_OVERVIEW_DETAILS,
  SET_PACS_MESSAGES,
  SET_PAYMENT_ID_DETAILS,
} from "./constants";
import { INITIAL_STATE } from "./reducers";

/**
 * @description Storing overview data
 * @param {Object} value
 * @returns
 */
export const setOverviewData = (value: string) => {
  return { type: SET_OVERVIEW_DETAILS, value };
};

/**
 * @description Storing Debitor data
 * @param {Object} value
 * @returns
 */
export const setDebitorData = (value: string) => {
  return { type: SET_DEBITOR_DETAILS, value };
};

/**
 * @description Storing CREDitor data
 * @param {Object} value
 * @returns
 */
export const setCreditorData = (value: string) => {
  return { type: SET_CREDITOR_DETAILS, value };
};

/**
 * @description Storing PaymentID data
 * @param {Object} value
 * @returns
 */
export const setPaymentDetails = (value: string) => {
  return { type: SET_PAYMENT_ID_DETAILS, value };
};

/**
 * @description Storing Flex details
 * @param {Array} value
 * @returns
 */
export const setFlexDetails = (value: string) => {
  return { type: SET_FLEX_DETAILS, value };
};

/**
 * @description Storing PAC Message details
 * @param {Array} value
 * @returns
 */
export const setPACsMessages = (value: string) => {
  return { type: SET_PACS_MESSAGES, value };
};

/**
 * @description Clear Store
 *
 * @returns
 */
export const setResetTransactionReport = () => {
  return {
    type: RESET_STATE,
    value: INITIAL_STATE,
  };
};
