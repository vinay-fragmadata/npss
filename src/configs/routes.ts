const APP_BASE_URL = "";

export const batchFileSearch = "batch-file-search";
export const batchSearch = "batch-search";

export const APP_ROUTES = {
  LOGIN: `${APP_BASE_URL}/login`,
  SIGN_UP: `${APP_BASE_URL}/sign-up`,
  FORGOT_PASSWORD: `${APP_BASE_URL}/forgot-password`,

  DEFAULT: `${APP_BASE_URL}/`,

  DASHBOARD: `${APP_BASE_URL}/dashboard`,

  SEARCH_TRANSACTION: `${APP_BASE_URL}/search-transaction`,
  TRANSACTION_DETAIL: `${APP_BASE_URL}/search-transaction/transaction-detail/:id`,

  BATCH_FILE_SEARCH: `${APP_BASE_URL}/${batchFileSearch}`,
  BATCH_SEARCH: `${APP_BASE_URL}/${batchSearch}`,
};

/**
 * @description Breadcrumb
 */
export const APP_ROUTES_BREADCRUMBS = {
  [APP_ROUTES.SEARCH_TRANSACTION]: [
    {
      name: "Home",
      url: APP_ROUTES.DEFAULT,
    },
    {
      name: "Search Transaction",
      url: "",
    },
  ],
  [APP_ROUTES.TRANSACTION_DETAIL]: [
    {
      name: "Home",
      url: APP_ROUTES.DEFAULT,
    },
    {
      name: "Search Transaction",
      url: APP_ROUTES.SEARCH_TRANSACTION,
    },
    {
      name: "Transaction-Detail",
      url: "",
    },
  ],
  [APP_ROUTES.BATCH_FILE_SEARCH]: [
    {
      name: "Home",
      url: APP_ROUTES.DEFAULT,
    },
    {
      name: "Batch File Search",
      url: "",
    },
  ],
  [APP_ROUTES.BATCH_SEARCH]: [
    {
      name: "Home",
      url: APP_ROUTES.DEFAULT,
    },
    {
      name: "Batch Search",
      url: "",
    },
  ],
};
