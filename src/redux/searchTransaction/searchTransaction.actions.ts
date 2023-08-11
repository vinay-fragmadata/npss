import { RESET_STATE } from "../global/constants";
import {
  SET_SEARCH_TRANSACTION_SUMMARY,
  SET_SEARCH_TRANSACTION_FORMDATA,
  SET_SINGLE_TRANSACTION,
  SET_TRANSACTION_ID,
  SET_TRANSACTION_TABLE_DATA,
  SET_SELECTED_TRANSACTIONS_ID,
} from "./searchTransaction.constant";
import { INITIAL_STATE } from "./searchTransaction.reducers";

/**
 * @description Storing Transaction summary in reducer
 * @param {Object} value
 * @returns
 */
export const setTransactionSummary = (value: string) => {
  return {
    type: SET_SEARCH_TRANSACTION_SUMMARY,
    value,
  };
};

export const setTransactionTableData = (value: string) => {
  return {
    type: SET_TRANSACTION_TABLE_DATA,
    value,
  };
};

/**
 * @description Storing Transaction summary ID in reducer
 * @param {Number | String} value
 * @returns
 */
export const setTransactionID = (id: string | number) => {
  return {
    type: SET_TRANSACTION_ID,
    value: id,
  };
};

/**
 * @description Storing Single Transaction value when user clicks
 * @returns
 */
export const setSingleTransaction = (data: object) => {
  return {
    type: SET_SINGLE_TRANSACTION,
    value: data,
  };
};

/**
 * @description Storing form data Transaction value when user clicks
 *
 * @returns
 */
export const setSearchTransactionFormData = (data: object) => {
  return {
    type: SET_SEARCH_TRANSACTION_FORMDATA,
    value: data,
  };
};

/**
 * @description Selected transactions lists ID
 *
 * @param {Array} data
 * @returns
 */
export const setSelectedTransactionIDs = (data: object) => {
  return {
    type: SET_SELECTED_TRANSACTIONS_ID,
    value: data,
  };
};

/**
 * @description Reset Reducer
 *
 * @returns
 */
export const setResetSearchTransaction = () => {
  return {
    type: RESET_STATE,
    value: INITIAL_STATE,
  };
};
