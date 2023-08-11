import { RESET_STATE } from "../global/constants";
import {
  SET_BATCH_FILE_SEARCH_ROWS,
  SET_BATCH_PAGE_DATA,
  SET_BATCH_SEARCH_FORM_DATA,
  SET_BATCH_SEARCH_ROWS,
} from "./constants";
import { INITIAL_STATE_BATCH } from "./reducers";

/**
 * @description Setting Batch file search rows to store
 *
 * @param {Array} value
 * @returns
 */
export const setBatchFileSearchRows = (value: string) => {
  return {
    type: SET_BATCH_FILE_SEARCH_ROWS,
    value,
  };
};

//-------------------------------------------

/**
 * @description Setting Batch file search rows to store
 *
 * @param {Array} value
 * @returns
 */
export const setBatchSearchResults = (value: string) => {
  return {
    type: SET_BATCH_SEARCH_ROWS,
    value,
  };
};

//-------------------------------------------------

/**
 * @description Storing form data batch value when user clicks
 *
 * @returns
 */
export const setBatchSearchFormData = (data: object) => {
  return {
    type: SET_BATCH_SEARCH_FORM_DATA,
    value: data,
  };
};

/**
 * @description Storing form data batch value when user clicks
 *
 * @returns
 */
export const setBatchPageData = (data: object) => {
  return {
    type: SET_BATCH_PAGE_DATA,
    value: data,
  };
};

/**
 * @description Reset Reducer
 *
 * @returns
 */
export const setResetBatch = () => {
  return {
    type: RESET_STATE,
    value: INITIAL_STATE_BATCH,
  };
};
