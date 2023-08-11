import React from "react";
import {
  string,
  node,
  func,
  bool,
  arrayOf,
  object,
  oneOfType,
} from "prop-types";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getXMLDownload } from "../../utils/helper/programmableDownload";

export default function CustomizedDialogs({
  title,
  open,
  onClose,
  actionType,
  msg,
}: {
  title: string;
  open: boolean;
  onClose: any;
  actionType: any;
  msg: string;
}) {
  /**
   * @description Closing Dialog box
   */
  const handleClose = () => {
    onClose();
  };

  /**
   * @description Downloading XML file
   */
  const handleDownloadXML = () => {
    getXMLDownload(msg, "pac");
  };

  return (
    <div>
      <DialogBox
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogBoxTitle id="customized-dialog-title" onClose={handleClose}>
          {title && title}
        </DialogBoxTitle>

        <DialogContent className="dialog-content">
          {<pre className="pac">{msg}</pre>}
        </DialogContent>

        {actionType.length > 0 && (
          <DialogActions>
            {actionType.includes("save") && (
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            )}
            {actionType.includes("download") && (
              <Button autoFocus onClick={handleDownloadXML}>
                Download
              </Button>
            )}
          </DialogActions>
        )}
      </DialogBox>
    </div>
  );
}

/**
 * Prop validation
 */
CustomizedDialogs.propTypes = {
  title: string,
  open: bool,
  onClose: func.isRequired,
  actionType: arrayOf(string),
  msg: oneOfType([string, object]),
};

/**
 * Default props
 */
CustomizedDialogs.defaultProps = {
  title: "",
  open: false,
  onClose: () => {},
  actionType: false,
  msg: "" || {},
};

interface DialogBoxInterface {
  children: object;
  onClose: any;
}

/**
 * @description Handle Dialog title
 *
 * @param {Object} props
 * @returns
 */
function DialogBoxTitle(props: object) {
  const { children, onClose, ...other } = props as DialogBoxInterface;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 5,
            color: (theme: object) => theme?.palette?.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

/**
 * Prop validation
 */
DialogBoxTitle.propTypes = {
  children: node,
  onClose: func.isRequired,
};

/**
 * Styling of components
 */
const DialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
