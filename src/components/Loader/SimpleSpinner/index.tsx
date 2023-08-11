import React from "react";
import { circularProgressClasses } from "@mui/material";
import { StyledCircularProgress } from "./StyledComponents";

interface SimpleSpinnerInterface {
  spinnercolor: string;
  value: number | string;
  variant: string;
  size: number | string;
  thickness: number;
  disableShrink: boolean;
  spinnerAnimationDuration: number | string;
  position: string;
  strokeLinecap: string | number;
}

const SimpleSpinner = (props: object) => {
  const {
    spinnercolor,
    value,
    variant,
    size = 40,
    thickness = 4,
    disableShrink,
    spinnerAnimationDuration,
    position,
    strokeLinecap,
  } = (props as SimpleSpinnerInterface) || {};

  return (
    <StyledCircularProgress
      variant={variant}
      sx={{
        color: spinnercolor,
        animationDuration: { spinnerAnimationDuration },
        position: { position },
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: { strokeLinecap },
        },
      }}
      size={size}
      thickness={thickness}
      value={value}
      {...props}
      disableShrink={disableShrink}
    />
  );
};

export default SimpleSpinner;
