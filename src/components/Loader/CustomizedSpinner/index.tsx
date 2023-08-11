import React from "react";
import { Box } from "@mui/system";
import SimpleSpinner from "../SimpleSpinner";

const CustomizedSpinner = (props: object) => {
  return (
    <Box sx={{ position: "relative" }}>
      <SimpleSpinner
        spinnercolor={"#DFE3E6"}
        value={100}
        variant={"determinate"}
        size={40}
        thickness={4}
      />

      <SimpleSpinner
        spinnercolor={"#FF5E00"}
        variant={"indeterminate"}
        size={40}
        thickness={4}
        disableShrink={true}
        spinnerAnimationDuration={"550ms"}
        position={"absolute"}
        strokeLinecap={"round"}
      />
    </Box>
  );
};

export default CustomizedSpinner;
