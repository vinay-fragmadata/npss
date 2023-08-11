const DOMAIN_PREFIX = window.location.href.startsWith("https")
  ? "https://"
  : "http://";

/**
 * @description Base url as per environment
 */
export const BASE_URL = {
  development: process.env.REACT_APP_API_DEV,
  production: process.env.REACT_APP_API_PROD,
  sit: process.env.REACT_APP_API_SIT,
  vpn: process.env.REACT_APP_API_VPN,
};

/**
 * @description API as per selected environment
 */

let API_BASE_URL;
let API_CONNECT_TEST;

let url = window.location.href;

API_BASE_URL = BASE_URL.production;

API_CONNECT_TEST = {
  API_BASE_URL,
  SECRET: process.env.REACT_APP_CLIENT_SECRET_PROD,
  KEY: process.env.REACT_APP_CLIENT_KEY_PROD,
  TOKEN_API: process.env.REACT_APP_ENDPOINT_TOKEN_API_PROD,
  env: process.env.REACT_APP_ENV_PROD,
  scope: process.env.REACT_APP_SCOPE_PROD,
};
console.log("url --2-api base url---", url, "API_BASE_URL", API_BASE_URL);

if (url.includes("localhost")) {
  API_BASE_URL = BASE_URL.vpn;
  API_CONNECT_TEST = {
    API_BASE_URL,
    SECRET: process.env.REACT_APP_CLIENT_SECRET_VPN,
    KEY: process.env.REACT_APP_CLIENT_KEY_VPN,
    TOKEN_API: process.env.REACT_APP_ENDPOINT_TOKEN_API_VPN,
    env: process.env.REACT_APP_ENV_VPN,
    scope: process.env.REACT_APP_SCOPE_VPN,
  };
}

if (url.includes("microservices-sit-npss.mashreqdev.com")) {
  API_BASE_URL = BASE_URL.sit;
  API_CONNECT_TEST = {
    API_BASE_URL,
    SECRET: process.env.REACT_APP_CLIENT_SECRET_SIT,
    KEY: process.env.REACT_APP_CLIENT_KEY_SIT,
    TOKEN_API: process.env.REACT_APP_ENDPOINT_TOKEN_API_SIT,
    env: process.env.REACT_APP_ENV_SIT,
    scope: process.env.REACT_APP_SCOPE_SIT,
  };

  console.log(
    "checking sit--",
    url,
    url.includes("sit"),
    BASE_URL,
    "API_BASE_URL",
    API_BASE_URL,
    "API_CONNECT_TEST--",
    API_CONNECT_TEST
  );
}
if (url.includes("microservices-dev-npss.mashreqdev.com")) {
  API_BASE_URL = BASE_URL.development;

  API_CONNECT_TEST = {
    API_BASE_URL: BASE_URL.development,
    SECRET: process.env.REACT_APP_CLIENT_SECRET_DEV,
    KEY: process.env.REACT_APP_CLIENT_KEY_DEV,
    TOKEN_API: process.env.REACT_APP_ENDPOINT_TOKEN_API_DEV,
    env: process.env.REACT_APP_ENV_DEV,
    scope: process.env.REACT_APP_SCOPE_DEV,
  };
}
console.log(
  "url --3-api base url---",
  url,
  "API_BASE_URL",
  API_BASE_URL,
  "base url-->-->--",
  BASE_URL
);
console.log("API_CONNECT_TEST-2--", API_CONNECT_TEST);

export const API_CONNECT = API_CONNECT_TEST;

console.log(
  "API_CONNECT --45",
  API_CONNECT,
  "API_CONNECT_TEST-108----",
  API_CONNECT_TEST
);

// remove after testing
export const bs = API_CONNECT;

/**
 * @description Login APIs
 */
export const LOGIN_API = {
  LOGIN: `${API_BASE_URL}/login`,
};

/**
 * @description: APIs for Dashboard
 */
export const DASHBOARD_API = {
  // @params reportDate=2023-01-01
  // @method GET
  GET_VOLUME_REPORT: `${API_BASE_URL}/getVolumeReport?reportDate=#DATE#`,
  GET_TAT_REPORT: `${API_BASE_URL}/getTatReport?reportDate=#DATE#`,

  // obsolete
  GET_TRANSACTION: `${API_BASE_URL}/searchTransactions?pageNumber=#page_number#&pageSize=#page_size#`,
};

/**
 * @description: APIs for Search-transaction
 */
export const SEARCH_TRANSACTION_API = {
  // @params pageNumber,pageSize
  // @method GET
  GET_TRANSACTION: `${API_BASE_URL}/searchTransactions?pageNumber=#page_number#&pageSize=#page_size#`,

  // @params
  // @method
  DOWNLOAD_TRANSACTIONS: `${API_BASE_URL}/downloadTransactions`,
  DOWNLOAD_PACS: `${API_BASE_URL}/downloadPacs`,
};

/**
 * @description: APIs for Transaction Page
 */
export const TRANSACTION_DETAIL_API = {
  // @params id
  // @method POST
  GET_TRANSACTION_REPORT: `${API_BASE_URL}/transactionDetails?id=:id`,
};

/**
 * @description: APIs for Batch File search
 */
export const BATCH_SEARCH_API = {
  // @params: pageNumber, Page size
  // @method POST
  BATCH_FILE_SEARCH: `${API_BASE_URL}/batchFileSearch?pageNumber=#PAGE_NUMBER#&pageSize=#PAGE_SIZE#`,

  // @params: pageNumber, Page size
  // @method POST
  BATCH_SEARCH: `${API_BASE_URL}/batchSearch?pageNumber=#PAGE_NUMBER#&pageSize=#PAGE_SIZE#`,
};
