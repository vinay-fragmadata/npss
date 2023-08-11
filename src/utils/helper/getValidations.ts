import { VALIDATION_MESSAGES } from "../../configs/messages";

/**
 * @description User name validation
 *
 * @param {String} name
 *
 * @returns {String} Error message
 */
export const getValidatedName = (name: string) => {
  if (!name || name.length == 0) {
    return VALIDATION_MESSAGES.enter_valid_name;
  }
};

/**
 * @description Password validation
 *
 * @param {String} password
 *
 * @returns {String} Error message
 */
export const getValidatedPassword = (password: string) => {
  if (!password || password.length == 0) {
    return VALIDATION_MESSAGES.enter_valid_password;
  }
};
