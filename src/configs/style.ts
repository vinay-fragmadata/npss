/**
 * @description text field styling
 */
export const textFieldStyling = {
  borderRadius: "2px ",
  borderColor: "#FF5E00",
  "& .MuiOutlinedInput-root": {
    borderRadius: "2px ",

    "& fieldset": {
      borderColor: "#c1c9cf",
      borderRadius: "2px ",
    },
    "&:hover fieldset": {
      borderColor: "#FF5E00",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#FF5E00",
    },
  },
  "& label.Mui-focused": {
    color: "#4f4f4f",
    fontFamily: "Gilroy-Medium",
    fontWeight: "800",
  },
  "& label": {
    color: "#4f4f4f",
    fontFamily: "Gilroy-Regular",
    fontWeight: "500",
  },
};
/**
 * @description Select input styling
 */
export const selectFieldStyling = {
  textAlign: "left",
  borderRadius: "2px ",

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
    borderRadius: "2px ",
  },
  ".MuiSvgIcon-root ": {
    fill: "#4A5052 !important",
    borderRadius: "2px ",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
  },
  "&:focus .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
  },
  "&:active .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
  },
};

/**
 * @description Select input styling in active state
 */
export const selectFieldStylingWithActive = {
  textAlign: "left",
  borderRadius: "2px ",

  ".MuiSvgIcon-root ": {
    fill: "#4A5052 !important",
    borderRadius: "2px ",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
    borderRadius: "2px ",
  },
  "&:focus .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
  },
  "&:active .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ff5e00 !important",
  },
};

/**
 * @description: Styling Select(dropdown) menus
 */
export const dropDownMenuStyling = {
  PaperProps: {
    sx: {
      // bgcolor: "red",
      borderRadius: "2px ",

      "& .MuiMenuItem-root": {
        borderBottom: "1px solid #E4E6ED",
        borderRadius: "2px ",
        width: "95%",
        margin: "auto",
      },
      "&:hover .MuiMenuItem-root": {},
      "&:active .MuiMenuItem-root": {},
    },
  },
};

/**
 * @description Date picker Styling
 */
export const datePickerStyling = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c1c9cf",
      borderRadius: "2px ",
    },
    "&:hover fieldset": {
      borderColor: "#ff5e00",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff5e00",
    },
  },
};
