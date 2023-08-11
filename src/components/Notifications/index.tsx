import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { string, number, bool, oneOfType } from "prop-types";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { Backdrop, Box, Button, Popover, Typography } from "@mui/material";
import { APP_ROUTES } from "../../configs/routes";
import LocalStorageService from "../../utils/Services/LocalStorageService";
import "./style.scss";

const ShowNotification = ({
  msg = "",
  msgType = "", // [success, failed, warn]
  isError = false,
  failedMsgTitle = "Failed message",
  statusCode,
  openNotification = false,
  onOpenNotification = () => {},
  onRedirect = () => {},
}: {
  msg: string;
  msgType: string;
  failedMsgTitle: string;
  isError: boolean;
  statusCode: string | number;
  openNotification: boolean;
  onOpenNotification: any;
  onRedirect: any;
}) => {
  const popover = useRef(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(Boolean(openNotification));

  /**
   * @description Closing notification
   */
  const handleClose = () => {
    setOpen(false);
    onOpenNotification(false);

    // redirecting to respective page
    if (msgType == "success" || statusCode == "200") {
      onRedirect(true);
    }

    // redirecting to login page in case of 401, 403 error
    if (statusCode == "401" || statusCode == "403") {
      LocalStorageService.removeAllData();
      navigate(APP_ROUTES.LOGIN);
    }
  };

  /**
   * @description Backdrop styling
   */
  const backdropStyle = {
    backdrop: {
      style: {
        backgroundColor: "transparent",
      },
    },
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
      className="backdrop"
      ref={popover}
    >
      <Popover
        // id={id}
        open={open}
        anchorEl={popover?.current}
        componentsProps={backdropStyle}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          display: "flex",
        }}
      >
        <Box className="popover">
          {msgType == "failed" || statusCode != "200" || isError ? (
            <Cancel
              className="error-icon"
              sx={{
                color: "#d10000",
              }}
            />
          ) : (
            <CheckCircle
              className="success-icon"
              sx={{
                color: "#0da931",
              }}
            />
          )}
        </Box>

        <Box className="message-section">
          {msgType == "success" || statusCode == "200" ? (
            <Typography className="success-message" sx={{ p: 2 }}>
              {msg}
            </Typography>
          ) : (
            <>
              {Boolean(failedMsgTitle) && (
                <Typography className="primary-message" sx={{ p: 2 }}>
                  {failedMsgTitle}
                </Typography>
              )}

              {Boolean(msg) && (
                <Typography className="secondary-message" sx={{ p: 2 }}>
                  {msg}
                </Typography>
              )}

              <>
                {/* Uncomment Try-again button as per requirement */}
                {/* {isError && (
                  <Button variant="contained" className="primary-btn">
                    Try Again
                  </Button>
                )} */}
                <Button
                  variant="text"
                  className="secondary-btn"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </>
            </>
          )}
        </Box>
      </Popover>
    </Backdrop>
  );
};

/**
 * @description prop validation
 */
ShowNotification.propTypes = {
  msg: string,
  msgType: string,
  failedMsgTitle: string,
  isError: bool,
  statusCode: oneOfType([string, number]),
  openNotification: bool,
};

/**
 * @description Default Props
 */
ShowNotification.defaultProps = {
  msg: "",
  msgType: "", // [success, failed, warn]
  isError: false,
  failedMsgTitle: "Failed",
  statusCode: 200,
  openNotification: false,
};

export default ShowNotification;
