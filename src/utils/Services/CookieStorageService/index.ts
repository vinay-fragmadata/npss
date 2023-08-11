import Cookies from "js-cookie";
import moment from "moment";
import enums from "../../../configs/enums";

class CookieStorageService {
  // Generic Cookie Functions
  static getCookie(key: string): string {
    return Cookies.get(key) ? Cookies.get(key)! : "";
  }

  static setCookie(key: string, data: string, expiresCookie?: Date | number) {
    Cookies.set(key, data, {
      expires: expiresCookie || moment().add(12, "hours").toDate(),
      path: "/",
      secure: true,
      sameSite: "Lax",
    });
  }

  static removeCookie(key: string) {
    Cookies.remove(key, { path: "/" });
  }

  // Access token Cookies
  // API Connect Cookies static
  static getAPIConnectToken() {
    return CookieStorageService.getCookie("accessToken");
  }

  static setAPIConnectToken(token: string) {
    CookieStorageService.setCookie(enums.accessToken, token);
  }

  static removeAPIConnectToken() {
    CookieStorageService.removeCookie("accessToken");
  }

  // Login Access token Cookies static
  getLoginAccessToken() {
    return CookieStorageService.getCookie("LOGIN_ACCESS_TOKEN_COOKIE");
  }

  static setLoginAccessToken(token: string, expiresCookie?: Date | number) {
    CookieStorageService.setCookie(
      "LOGIN_ACCESS_TOKEN_COOKIE",
      token,
      expiresCookie
    );
  }

  static removeLoginAccessToken() {
    CookieStorageService.removeCookie("LOGIN_ACCESS_TOKEN_COOKIE");
  }
  // // Login Refresh token Cookies
  // static getLoginRefreshToken() {
  //   return CookieStorageService.getCookie("LOGIN_REFRESH_TOKEN_COOKIE");
  // }
  // static setLoginRefreshToken(token: string, expiresCookie?: Date | number) {
  //   CookieStorageService.setCookie(
  //     "LOGIN_REFRESH_TOKEN_COOKIE",
  //     token,
  //     expiresCookie
  //   );
  // }
  // static removeLoginRefreshToken() {
  //   CookieStorageService.removeCookie("LOGIN_REFRESH_TOKEN_COOKIE");
  // }

  static removeAllCookie() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  // User Name Cookies
  // static getUserName() {
  //   return CookieStorageService.getCookie('USERNAME_COOKIE');
  // }
  // static setUserName(userName: string) {
  //   CookieStorageService.setCookie('USERNAME_COOKIE', userName);
  // }
  // static removeUserName() {
  //   CookieStorageService.removeCookie('USERNAME_COOKIE');
  // }
  // static isViewerProfile() {
  //   return CookieStorageService.getCookie('IS_VIEWER_PROFILE');
  // }
  // static getUserRole() {
  //   if (CookieStorageService.isViewerProfile()) {
  //     return CookieStorageService.getCookie(
  //       'VIEWER_PROFILE_USER_ROLE_COOKIE'
  //     );
  //   }
  //   return CookieStorageService.getCookie('USER_ROLE_COOKIE');
  // }
}
export default CookieStorageService;
