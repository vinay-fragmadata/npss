import axios from "axios";
import _ from "lodash";
import { API_CONNECT } from "../configs/api";
import enums from "../configs/enums";

import LocalStorageService from "../utils/Services/LocalStorageService";
import SessionStorageService from "../utils/Services/SessionStorageService";
import CookieStorageService from "../utils/Services/CookieStorageService";

export default class ServiceAPI {
  // For Getting Access Token from API Connect
  static async setAPIConnectToken(scope: "NPSS") {
    const APISecret = API_CONNECT.SECRET as string;
    const APIKey = API_CONNECT.KEY as string;

    const data = {
      grant_type: "client_credentials",
      scope: scope,
      client_id: APIKey,
      client_secret: APISecret,
    };

    const formBody: string[] = [];

    _.forEach(data, (value: string, key: string) => {
      formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });

    const bodyData = formBody.join("&");

    const axiosObject = initAxiosInstance({
      baseURL: API_CONNECT.API_BASE_URL,
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
    });

    const tokenData = await axiosObject?.post(
      API_CONNECT.TOKEN_API as string,
      bodyData
    );
    const {
      status,
      data: { access_token: accessToken, expires_in: expiresIn },
    } = tokenData;

    // Storing access token in LocalStorage, cookieStorage, SessionStorage
    if (status == 200) {
      LocalStorageService.setData("accessToken", `Bearer ${accessToken}`);

      // uncomment to store accessToken in Cookie storage and in SessionStorage as per requirement
      // SessionStorageService.setData("accessToken", `Bearer ${accessToken}`);
      // SessionStorageService.setData("expiresIn", expiresIn);

      // CookieStorageService.setAPIConnectToken(`Bearer ${accessToken}`);
    }

    return tokenData;
  }
}

/**
 * @description Axios Instance Interceptor
 *
 * @param {Object} config
 *
 * @returns {Object} res
 */
const initAxiosInstance = (config: any) => {
  const axiosObject = axios.create(config);

  axiosObject?.interceptors.request.use(
    (request) => {
      return request;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosObject?.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const userData = LocalStorageService.getData(enums.USER_DATA);
      if (err?.response?.status === 401 && userData) {
        const logoutModal =
          window?.document?.getElementsByClassName("logout-modal");
        if (logoutModal && logoutModal?.length) {
          logoutModal[0]?.classList?.add("active");
        }
        console.error("Response error 401");
      }
      return Promise.reject(err);
    }
  );
  return axiosObject;
};
