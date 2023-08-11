import { RESET_STATE } from "../global/constants";
import {
  SET_DASHBOARD_SUMMARY,
  SET_SINGLE_TRANSACTION,
  SET_TRANSACTION_ID,
  SET_TRANSACTION_TABLE_DATA,
} from "./dashboard.constant";
import { INITIAL_STATE } from "./dashboard.reducers";

/**
 * @description Storing Transaction summary in reducer
 * @param {Object} value
 * @returns
 */
export const setTransactionSummary = (value: string) => {
  return {
    type: SET_DASHBOARD_SUMMARY,
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
 * @description Reset Reducer
 *
 * @returns
 */
export const setResetDashboard = () => {
  return {
    type: RESET_STATE,
    value: INITIAL_STATE,
  };
};
