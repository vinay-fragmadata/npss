import CookieStorageService from "../Services/CookieStorageService";
import LocalStorageService from "../Services/LocalStorageService";

/**
 * @description Verify if user is logged in by checking token
 */
export const isUserLoggedIn = Boolean(
  LocalStorageService.getData("npssJwtToken") as string
);

/**
 * @description Get npssJwtToken from localStorage or CookieStorage
 */
export const npssJwtToken = LocalStorageService.getData(
  "npssJwtToken"
) as string;
