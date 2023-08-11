import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputAdornment, Stack, TextField } from "@mui/material";

import { datePickerStyling } from "../../configs/style";

import { getFormattedDate } from "../../utils/helper/getFormattedDateAndTime";

import "./style.scss";

const CustomizedDatePicker = ({
  date,
  onDateChange,
  format = "YYYY-MM-DD",
  label,
  errorText,
  minDate,
  isDisabled = false,
}: {
  date: string;
  onDateChange: any;
  format: string;
  label: string;
  name: string;
  errorText: string | boolean;
  minDate: string;
  isDisabled: boolean;
}) => {
  /**
   * @description Get formatted date
   *
   * @param {Object} e
   */
  const handleDateChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    onDateChange(getFormattedDate(e));
  };

  /**
   * @description Handling focus on date picker
   *
   * @param {String} labelDate
   * @returns
   */
  const handleFocus = (labelDate: any) => (_: any) => {
    const [datePickerInput]: any = document.getElementsByClassName(labelDate);
    let [datePickerLabel] = datePickerInput?.getElementsByTagName("label");

    datePickerLabel.id = null;

    switch (labelDate) {
      case "From":
      case "To":
      case "Date":
        datePickerLabel.id = "label-text-label";
        datePickerLabel.id = "label-text-label";
        break;

      default:
        datePickerLabel.id = "";
        break;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          className={`date-picker-input ${label}`}
          label={label}
          inputFormat={format}
          value={date}
          onChange={handleDateChange}
          minDate={minDate}
          disabled={isDisabled}
          error={Boolean(errorText)}
          helperText={errorText}
          renderInput={(params) => (
            <TextField
              className="error-text caret"
              id="caret"
              error={Boolean(errorText)}
              helperText={errorText}
              onFocus={handleFocus(label)}
              {...params}
              sx={datePickerStyling}
            />
          )}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default CustomizedDatePicker;
