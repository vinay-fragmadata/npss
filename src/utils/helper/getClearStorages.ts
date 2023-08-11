import CookieStorageService from "../Services/CookieStorageService";
import LocalStorageService from "../Services/LocalStorageService";
import SessionStorageService from "../Services/SessionStorageService";

/**
 * @description Clearing LocalStorage, SessionStorage, CookieStorage
 */
export const clearStorages = () => {
  LocalStorageService.removeAllData();
  CookieStorageService.removeAllCookie();
  SessionStorageService.removeAllData();
};
