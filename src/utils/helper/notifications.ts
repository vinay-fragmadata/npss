import { ERROR_MESSAGES } from "../../configs/messages";

/**
 * @description To show error message
 *
 * @param {String} msg [message to show]
 */
export const showErrorMsg = (msg: string = ERROR_MESSAGES.internal_error) => {
  showNotification(msg, "error");
};

/**
 * @description To show success message
 *
 * @param {String} msg [message to show]
 */
export const showSuccessMsg = (msg: string) => {
  showNotification(msg, "success");
};

/**
 * @description To show Warning message
 *
 * @param {String} msg [message to show]
 */
export const showWarnMsg = (msg: string) => {
  showNotification(msg, "warning");
};

/**
 * @description To show info message
 *
 * @param {String} msg [message to show]
 */
export const showInfoMsg = (msg: string) => {
  showNotification(msg, "info");
};

/**
 * @description Format and show Notification
 *
 * @param {String} msg
 * @param {String} type ['success', 'warning', 'info', 'error']
 *
 * @return {Object} snack
 */
export const showNotification = (msg: string, type: string) => {
  const detail = {
    id: new Date().getTime(),
    message: typeof msg == "string" ? msg : "",
    type,
  };

  const e = new CustomEvent("SHOW_NOTIFICATION", { detail });
  const isTrue = document.dispatchEvent(e);

  return isTrue;
};
