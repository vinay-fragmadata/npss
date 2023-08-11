import React from "react";
import { string, bool } from "prop-types";
import { Typography, styled, Box } from "@mui/material";
import "./styles.css";

const Title = ({
  title = "Dashboard",
  alignTextProp = "",
  secondaryTitle = false,
}) => {
  return (
    <Box className="title-container">
      <StyledTypography
        variant="h5"
        className={secondaryTitle ? "secondaryTitle" : "primaryTitle"}
        style={{
          textAlign: alignTextProp ? alignTextProp : "",
        }}
      >
        {title}
      </StyledTypography>
      <Box
        className={secondaryTitle ? "secondary-underline" : "primary-underline"}
      ></Box>
    </Box>
  );
};

/**
 * Props validation
 */
Title.propTypes = {
  title: string,
  alignTextProp: string,
  secondaryTitle: bool,
};

/**
 * default Props
 */
Title.defaultProps = {
  title: "Dashboard",
  alignTextProp: "",
  secondaryTitle: false,
};

export default Title;

/**
 * @description custom Styling
 */
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  width: "fit-content",
  fontFamily: "Gilroy-medium",
  color: "#313131",
}));
