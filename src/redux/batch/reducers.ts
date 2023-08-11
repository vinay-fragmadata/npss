import { RESET_STATE } from "../global/constants";
import {
  SET_BATCH_FILE_SEARCH_ROWS,
  SET_BATCH_PAGE_DATA,
  SET_BATCH_SEARCH_FORM_DATA,
  SET_BATCH_SEARCH_ROWS,
} from "./constants";

export const INITIAL_STATE_BATCH = {
  batchFileSearchRows: [],
  batchFileCurrPage: 1,
  batchFileNoOfRows: 10,

  batchSearchRows: [],
  batchCurrPage: 1,
  batchNoOfRows: 10,

  batchFormData: {},

  batchPageData: {},
};

interface actionsInterface {
  type: string;
  value: string;
}

const batchReducer = (
  state: object = INITIAL_STATE_BATCH,
  action: actionsInterface
) => {
  const { type, value } = action || {};
  switch (type) {
    case SET_BATCH_FILE_SEARCH_ROWS:
      return { ...state, batchFileSearchRows: value };

    case SET_BATCH_SEARCH_ROWS:
      return { ...state, batchSearchRows: value };

    case SET_BATCH_SEARCH_FORM_DATA:
      return { ...state, batchFormData: value };

    case SET_BATCH_PAGE_DATA:
      return { ...state, batchPageData: value };

    case RESET_STATE:
      return INITIAL_STATE_BATCH;

    default:
      return { ...state };
  }
};

export default batchReducer;
