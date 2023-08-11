import React from "react";
import { string, bool } from "prop-types";

import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

import { COLORS } from "../../configs/theme";
import "./style.css";

const StyledTextBox = ({
  primaryText = "",
  secondaryText,
  uniqueKey,
  hasChild = false,
  url = "",
  link = "",
  isLessGap = false,
  multiples = [],
  onRedirect,
}: {
  primaryText: string;
  secondaryText: string | any[];
  uniqueKey: string | number;
  hasChild: boolean;
  url: string;
  link: string;
  isLessGap: boolean;
  multiples: number[];
  onRedirect: any;
}) => {
  /**
   * @description Redirecting to transaction id
   *
   * @param {string|number } id
   * @returns
   */
  const handleRedirect = (id: string | number) => (_: any) => {
    onRedirect(id);
  };

  return (
    <StyledBox key={uniqueKey}>
      <StyledText
        className={isLessGap ? "primary-less-gap" : "primary-more-gap"}
      >
        {primaryText}:
      </StyledText>

      {multiples && multiples.length > 0 ? (
        <StyledMultiplesBox>
          {multiples.map((id, index) => {
            return (
              <>
                <StyledLink onClick={handleRedirect(id)} key={index}>
                  {id}
                </StyledLink>
                {multiples.length - 1 == index ? "" : <>, &nbsp;</>}
              </>
            );
          })}
        </StyledMultiplesBox>
      ) : (
        <StyledTextDetail
          className={isLessGap ? "secondary-less-gap" : "secondary-more-gap"}
        >
          {secondaryText} {hasChild && <a href={url}>{link}</a>}
        </StyledTextDetail>
      )}
    </StyledBox>
  );
};

/**
 * Prop validation
 */
StyledTextBox.propTypes = {
  primaryText: string,
  secondaryText: string,
  uniqueKey: string,
  hasChild: bool,
  url: string,
  link: string,
};

/**
 * Default props
 */
StyledTextBox.defaultProps = {
  primaryText: "",
  secondaryText: "",
  uniqueKey: "1",
  hasChild: false,
  url: "",
  link: "",
};

export default StyledTextBox;

/**
 * Custom styling
 */
const StyledBox = styled(Box)(() => ({
  backgroundColor: "#fff",
  padding: "1%",
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  fontFamily: "Gilroy-Medium",
  color: "#313131",
}));

const StyledText = styled(Typography)(() => ({
  fontSize: 14,
  textAlign: "left",
  color: "#313131",
  fontFamily: "Gilroy-Medium",
  paddingLeft: "5px",
}));

const StyledTextDetail = styled(Typography)(() => ({
  fontSize: 14,
  textAlign: "left",
  color: "#313131",
  fontFamily: "Gilroy-Regular",
}));

const StyledMultiplesBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "start",
  width: "50%",
}));

const StyledLink = styled(Typography)(() => ({
  fontSize: 14,
  textAlign: "left",
  // color: "#313131",
  fontFamily: "Gilroy-Regular",
  cursor: "pointer",
  color: COLORS.primary_color,
}));
