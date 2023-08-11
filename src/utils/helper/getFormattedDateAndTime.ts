import moment from "moment";
import { DATE_TIME_FORMATS } from "../../configs/dateFormats";
import { ERROR_MESSAGES } from "../../configs/messages";

/**
 * @description Get Formatted date in YYYY-MM-DD HH:MM:SS AM/PM format
 *
 * @param {Object} date
 * @returns
 */
export const getFormattedDateAndTime = (dateToFormat: string) => {
  if (!dateToFormat) return null;

  let date = new Date(dateToFormat);

  if (moment(date).isValid()) {
    return `${moment(date).format(DATE_TIME_FORMATS.DEFAULT_DATE)} ${moment(
      date
    ).format(DATE_TIME_FORMATS.TIME_AM_PM)} `;
  }
};

/**
 * @description Get Formatted date in YYYY-MM-DD format
 *
 * @param {Object} date
 * @returns
 */
export const getFormattedDate = (date: string) => {
  if (!date) return null;

  const formattedDate = date.toLocaleString();
  return moment(formattedDate).format(DATE_TIME_FORMATS.DEFAULT_DATE);
};

/**
 * @description Check if start-date is greater than end-date
 *
 * @param {String} startDate
 * @param {String} endDate
 *
 * @returns {boolean}
 */
export const getIsStartDateGreaterThanEndDate = (
  startDate: string,
  endDate: string
) => {
  if (!startDate || !endDate) return null;

  const startDateToFormat = moment(startDate);
  const endDateToFormat = moment(endDate);

  // use anyone
  // let isAfter = startDateToFormat.isAfter(endDateToFormat);

  const isStartDateGreaterThanEndDate =
    moment(endDateToFormat).format(DATE_TIME_FORMATS.DEFAULT_DATE) >=
    moment(startDateToFormat).format(DATE_TIME_FORMATS.DEFAULT_DATE);

  return isStartDateGreaterThanEndDate;
};

/**
 * @description Get error on dates
 *
 * @param {string} startDate
 * @param {string} endDate
 *
 * @returns
 */
export const getDateError = (startDate: string = "", endDate: string = "") => {
  const dateToCompare = getIsStartDateGreaterThanEndDate(startDate, endDate);

  if (!dateToCompare) return ERROR_MESSAGES.start_date_greater_than_end_date;
};

/**
 * @description Is date valid
 *
 * @param {String} date
 * @returns  {boolean} validDate
 */
export const isValidDate = (date: string) => {
  const validDate = moment(date).isValid();

  return validDate;
};

/**
 * @description Get date object with end date required error
 *
 * @param {String} startDate
 * @param {String} endDate
 *
 * @returns  {object}
 */
export const getEndDateRequiredObject = (
  startDate: string = "",
  endDate: string = ""
) => {
  if (startDate && !endDate) {
    return {
      startDate: "",
      endDate: ERROR_MESSAGES.end_date_required,
    };
  }
};

/**
 * @description Get date object with end date error(Must be greater than end date)
 *
 * @param {String} startDate
 * @param {String} endDate
 *
 * @returns  {object}
 */
export const getGreaterEndDateObject = (
  startDate: string = "",
  endDate: string = ""
) => {
  if (startDate && endDate) {
    const isError = getDateError(startDate, endDate);

    return (
      isError && {
        startDate: "",
        endDate: ERROR_MESSAGES.start_date_greater_than_end_date,
      }
    );
  }
};

/**
 * @description Get date object with end date errors
 * @1.Must be greater than end date
 * @2.End date required
 * @3.Valid year
 *
 * @param {String} startDate
 * @param {String} endDate
 *
 * @returns  {object}
 */
export const getMultipleDateError = (
  startDate: string = "",
  endDate: string = ""
) => {
  // If start date or end date is invalid
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return {
      startDate:
        startDate && !isValidDate(startDate)
          ? ERROR_MESSAGES.invalid_start_date
          : "",
      endDate:
        endDate && !isValidDate(endDate)
          ? ERROR_MESSAGES.invalid_end_date
          : startDate && !endDate && ERROR_MESSAGES.end_date_required,
    };
  }

  // End date required
  if (startDate && !endDate) {
    return {
      startDate: startDate,
      endDate: ERROR_MESSAGES.end_date_required,
    };
  }

  // When end date is greater the start date
  if (startDate && endDate) {
    const isError: boolean | string | any = getDateError(startDate, endDate);

    return {
      startDate:
        getValidYear(startDate) == ERROR_MESSAGES.invalid_year
          ? ERROR_MESSAGES.invalid_year
          : "",
      endDate:
        getValidYear(endDate) == ERROR_MESSAGES.invalid_year
          ? ERROR_MESSAGES.invalid_year
          : isError
          ? ERROR_MESSAGES.start_date_greater_than_end_date
          : "",
    };
  }
};

/**
 * @description Get Year
 *
 * @param {String} date
 * @returns {String} Valid date or Error Message
 */
export const getValidYear = (date: string) => {
  if (!date || date == "Invalid date") return;

  const [year] = date.split("-");

  return year < "2199" && year > "1900" ? date : ERROR_MESSAGES.invalid_year;
};

/**
 * @description Get date Error
 * @param {String} date
 * @returns
 */
export const getDateErrors = (date: string) => {
  let dateError = "";
  const isValidStartDate = isValidDate(date);

  if (!date) {
    dateError = ERROR_MESSAGES.enter_valid_date;
  } else if (!isValidStartDate) {
    dateError = ERROR_MESSAGES.invalid_date;
  } else if (getValidYear(date) == ERROR_MESSAGES.invalid_year) {
    dateError = ERROR_MESSAGES.invalid_year;
  }

  return dateError;
};
