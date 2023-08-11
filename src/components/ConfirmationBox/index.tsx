import * as React from "react";
import {
  DialogTitle,
  DialogContentText,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { BUTTON_TEXTS, TITLES } from "../../configs";
import ButtonGroup from "../ButtonGroup";
import Title from "../Title";
import "./style.scss";

const ConfirmationBox = ({
  isOpened,
  confirmationType,
  onCloseConfirmation,
  options = [],
}: {
  isOpened: boolean;
  confirmationType: string | any;
  onCloseConfirmation: any;
  options: any[];
}) => {
  /**
   * @description Closing confirmation box
   */
  const handleClose = () => {
    onCloseConfirmation();
  };

  /**
   * @description Getting dynamic title
   */
  const getConfirmationTitle = () => {
    if (confirmationType === BUTTON_TEXTS.RETURN) {
      return TITLES.CONFIRMATION_TITLE.return_title;
    } else if (confirmationType === BUTTON_TEXTS.REV) {
      return TITLES.CONFIRMATION_TITLE.rev_title;
    } else {
      return "";
    }
  };

  /**
   * @description handle click on primary or YES button
   */
  const handleClickPrimary = () => {
    console.log("handleClickPrimary --clicked on yes");
    onCloseConfirmation();
  };

  /**
   * @description handle click on secondary or NO button
   */
  const handleClickSecondary = () => {
    console.log("handleClickSecondary --clicked on NO");
    onCloseConfirmation();
  };

  const handleChangeOption = (option: any) => {
    console.log("option--", option);
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="confirmation-box"
      >
        <DialogTitle id="alert-dialog-title">
          <Title title={getConfirmationTitle()} />
        </DialogTitle>

        {confirmationType === BUTTON_TEXTS.RETURN && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl fullWidth className="confirmation-select">
                <InputLabel id="select-label">Reason for Return</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={"isBatch"}
                  label="Reason for Return"
                  onChange={handleChangeOption}
                  className="select-input"
                  name="reason"
                >
                  {(options || []).map((option, index) => {
                    return (
                      <MenuItem
                        key={`${option?.value}-${index}`}
                        value={option?.value}
                      >
                        {option?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions className="confirmation-action">
          <ButtonGroup
            onPrimaryBtnClick={handleClickPrimary}
            onSecondaryBtnClick={handleClickSecondary}
            primaryButtonText={"Yes"}
            isClearButtonEnabled={true}
            clearButtonText={"No"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationBox;
