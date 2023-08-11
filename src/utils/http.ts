import axios from "axios";
import { API_CONNECT } from "../configs/api";
import { AUTH_MSG, ERROR_MESSAGES } from "../configs/messages";
import ServiceAPI from "../services";
// import { npssJwtToken } from "../utils/helper/getUserLoginDetails";
import LocalStorageService from "./Services/LocalStorageService";

/**
 * @description Cancel Token
 */
const { CancelToken } = axios;

/**
 * @description use to cancel http requests
 */
let cancelHttpTokens: any[] = [];

/**
 * @description Common header
 *
 * @returns
 */
export const getCommonHeaders = (headers: Object | any = {}) => {
  try {
    const npssJwtToken = localStorage.getItem("npssJwtToken") as string;
    const apiConnectToken = LocalStorageService.getData(
      "accessToken"
    ) as string;

    const formattedNpssJwtToken = npssJwtToken?.includes('"')
      ? npssJwtToken?.replace(/['"]+/g, "")
      : npssJwtToken;

    const APIKey = API_CONNECT.KEY as string;

    let headersData = {
      ...headers,
      Authorization: apiConnectToken,
      clientid: APIKey,
      Accept: "application/json",
      "content-type": "application/json",
      "Cache-Control": "no-cache",
      npssJwtToken: formattedNpssJwtToken,
    };

    return headersData;
  } catch (err) {
    console.error(err);
  }
};

/**
 * @description Helper Params used in Request
 */
const HELPER_PARAMS = {
  callback: null, //Function|null
  hideError: false,

  // Additional Headers
  headers: {},
};

/**
 * @description Http Get Request
 *
 * @param {String} url
 * @returns
 */
export const httpsGet = async (url = "") => {
  const { hideError, headers: helperParamHeader } = HELPER_PARAMS || {};

  let headers = getCommonHeaders(helperParamHeader);

  try {
    const response = await axios
      .get(url, {
        headers: headers,

        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          // if(callback) callback(c)
        }),
      })
      .then(httpHandleResponse)
      .catch((err) => {
        return httpHandleError(err, hideError);
      });

    return response;
  } catch (error) {
    console.error("---httpGet Error---", error);
    return Promise.reject({});
  }
};

/**
 * @description Http Get Request for downloading
 *
 * @param {String} url
 * @returns
 */
export const httpsGetDownload = async (url = "") => {
  const { hideError, headers: helperParamHeader } = HELPER_PARAMS || {};

  let headers = getCommonHeaders(helperParamHeader);

  const npssJwtToken = localStorage.getItem("npssJwtToken") as string;
  const apiConnectToken = LocalStorageService.getData("accessToken") as string;

  const formattedNpssJwtToken = npssJwtToken?.includes('"')
    ? npssJwtToken?.replace(/['"]+/g, "")
    : npssJwtToken;

  const APIKey = API_CONNECT.KEY as string;

  let headersData = {
    ...headers,
    Authorization: apiConnectToken,
    clientid: APIKey,
    Accept: "application/octet-stream",
    "Content-Disposition": "attachment",
    "Content-Type":
      "application/csv" ||
      "application/xls" ||
      "application/xlsx" ||
      "application/octet-stream" ||
      "application/rar" ||
      "application/zip",

    "Cache-Control": "no-cache",
    npssJwtToken: formattedNpssJwtToken,
  };

  try {
    const response = await axios
      .get(url, {
        responseType: "blob" || "arraybuffer",
        headers: headersData,

        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          // if(callback) callback(c)
        }),
      })
      .then(httpHandleResponse)
      .catch((err) => {
        return httpHandleError(err, hideError);
      });

    return response;
  } catch (error) {
    console.error("---httpGetDownload Error---", error);
    return Promise.reject({});
  }
};

/**
 * @description http post method
 *
 * @param url
 * @param params
 * @param param2
 *
 */
export const httpPost = async (url = "", params = {}, header = {}) => {
  try {
    const { hideError, headers: helperParamHeader } = HELPER_PARAMS || {};

    // Token API
    const apiConnectToken = LocalStorageService.getData(
      "accessToken"
    ) as string;

    if (!apiConnectToken) {
      await ServiceAPI.setAPIConnectToken("NPSS");
    }

    let headers = { ...header, ...helperParamHeader };

    const response = await axios
      .post(url, params, {
        headers: getCommonHeaders(headers),

        cancelToken: new CancelToken((c) => {
          cancelHttpTokens.push(c);
          // if(callback) callback(c)
        }),
      })
      .then(httpHandleResponse)
      .catch((err) => {
        return httpHandleError(err, hideError);
      });

    return response;
  } catch (error) {
    console.error("--httpPost catch2 error--", error);
    return Promise.reject({});
  }
};

/**
 * @description Handle Success Response
 *
 * @param {Object|null} res
 *
 * @returns {Object|null}
 *
 */
export const httpHandleResponse = (res: Object | String | any) => {
  cancelHttpTokens = [];

  if (!res) return Promise.reject(null);

  return Promise.resolve(res);
};

/**
 * @description HTTP error Messages with status code
 *
 * @param error
 * @param hideError
 *
 * @returns
 */
const httpHandleError = (error: any, hideError: any) => {
  try {
    if (hideError || !error) return Promise.reject({});

    /** Handle Cancel Request */
    cancelHttpTokens = [];

    if (!error?.request) return Promise.reject("cancelled");

    const xhr = error?.request;
    let err = {};

    const statusCode = xhr?.status;

    switch (statusCode) {
      case undefined || "undefined":
        return {
          isError: true,
          msg: AUTH_MSG.something_went_wrong,
          statusCode: 0,
        };

      case 0:
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.something_went_wrong,
          statusCode,
        };

      case 400:
        return {
          isError: true,
          msg:
            err?.message ||
            error?.response?.data?.error ||
            AUTH_MSG.session_expired,
          statusCode,
        };

      case 401:
        if (window.location.href.includes("login")) {
          localStorage.clear();
        }
        // window.location.reload(); //Reload page

        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 402:
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 403:
        if (window.location.href.includes("login")) {
          localStorage.clear();
        }
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 404:
        if (window.location.href.includes("login")) {
          localStorage.clear();
        }
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 422:
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 502:
        return {
          isError: true,
          msg: err?.message || AUTH_MSG.session_expired,
          statusCode,
        };

      case 503:
        return {
          isError: true,
          msg: err?.message || ERROR_MESSAGES.something_went_wrong,
          statusCode,
        };

      default:
        return {
          isError: true,
          msg: err?.message || ERROR_MESSAGES.something_went_wrong,
          statusCode,
        };
    }
  } catch (err) {
    console.error("error in catch httpHandleError", err);
  }
};

/**
 * @description HTTP Cancel request
 */
export const httpCancel = () => {
  try {
    cancelHttpTokens.forEach((cancel: any) => cancel());
    cancelHttpTokens = [];
  } catch (e) {
    cancelHttpTokens = [];
  }
};
