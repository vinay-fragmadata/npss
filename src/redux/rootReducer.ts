import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SET_DASHBOARD_SUMMARY } from "./dashboard/dashboard.constant";
import dashboardReducer from "./dashboard/dashboard.reducers";
import transactionDetailReducer from "./transactionReport/reducers";
import searchTransactionReducer from "./searchTransaction/searchTransaction.reducers";
import batchReducer from "./batch/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [SET_DASHBOARD_SUMMARY],
};
const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  searchTransaction: searchTransactionReducer,
  transactionReport: transactionDetailReducer,
  batch: batchReducer,
});

export default persistReducer(persistConfig, rootReducer);
