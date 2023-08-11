import React from "react";
import "./style.scss";

import {
  PrimaryButton,
  SecondaryButton,
  StyledButtonContainer,
  StyledButtonGroup,
} from "./StyledComponents";

const ButtonGroup = ({
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  primaryButtonText,
  isClearButtonEnabled,
  clearButtonText,
}: {
  onPrimaryBtnClick: any;
  onSecondaryBtnClick: any;
  primaryButtonText: string;
  isClearButtonEnabled: boolean;
  clearButtonText: string;
}) => {
  /**
   * @description callback of primary button
   */
  const handlePrimaryBtnClick = () => {
    onPrimaryBtnClick();
  };

  /**
   * @description callback of secondary button
   */
  const handleClearForm = () => {
    onSecondaryBtnClick();
  };

  return (
    <StyledButtonContainer className="button-container">
      <StyledButtonGroup className="btnGroup">
        {isClearButtonEnabled && (
          <SecondaryButton
            variant="outlined"
            type="reset"
            onClick={handleClearForm}
            data-testid="secondary-btn-id"
            onBlur={handleClearForm}
            className="cancel-button"
          >
            {clearButtonText}
          </SecondaryButton>
        )}

        <PrimaryButton
          variant="contained"
          className="primaryButton"
          onClick={handlePrimaryBtnClick}
          data-testid="primary-btn-id"
        >
          {primaryButtonText}
        </PrimaryButton>
      </StyledButtonGroup>
    </StyledButtonContainer>
  );
};

export default ButtonGroup;
