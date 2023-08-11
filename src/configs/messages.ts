/**
 * @description Auth (Login | Signup ) Messages
 */
export const AUTH_MSG = {
  session_expired: "Session Expired",
  password_expired: "Password updated, Please login",
  something_went_wrong: "Something went wrong",
  authorization_failed: "Authorization Failed", // 403
  access_denied: "Access Denied", // 403
  authentication_failed: "Authentication Failed", // 401
  wrong_credential: "Please retry logging in with correct credentials.", // 401
};

/**
 * @description Success Messages
 */
export const SUCCESS_MESSAGES = {
  login_success: "Login Success",
};

/**
 * @description Error Messages
 */
export const ERROR_MESSAGES = {
  login_failed: "Login Failed",
  unauthorized: " Unauthorized",
  something_went_wrong: "Something went wrong",

  internal_error: "An internal error occurred.",

  start_date_greater_than_end_date: "End Date must be greater than Start Date",
  downloading_error: "Error in Downloading.",

  invalid_date: "Invalid Date",
  enter_valid_date: "Please enter a valid date",
  invalid_start_date: "Invalid Start Date",
  invalid_end_date: "Invalid End Date",
  end_date_required: "End Date Required",
  start_date_required: "Start Date Required",
  invalid_year: "Invalid Year",
};

/**
 * @description Validation messages
 */
export const VALIDATION_MESSAGES = {
  enter_valid_name: "Please Enter a valid user name",
  enter_valid_password: "Please Enter a valid password",
};
