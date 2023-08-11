import React, { useState } from "react";
import { bool } from "prop-types";

import { Backdrop, Box, styled, Typography } from "@mui/material";
import { ICONS } from "../../configs/imageContainer";
import "./style.scss";

const NoRecordsFound = ({ open }: { open: boolean }) => {
  const [isOpen, setOpen] = useState(open);

  /**
   * @description Closing notification
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={{
          color: "#838383",
          background: "rgba(49, 49, 49, 0.6)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)",
        }}
        open={isOpen}
        onClick={handleClose}
      >
        <Box className="container">
          <Box className="not-found">
            <img
              src={ICONS.noRecordFound.image}
              alt={ICONS.noRecordFound.alt}
              width="50px"
              height="50px"
              className="not-found-icon"
            />
            <StyledNoRecordFound>No Record Found</StyledNoRecordFound>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
};

/**
 * @description Props validation
 */
NoRecordsFound.propTypes = {
  open: bool,
};

/**
 * @description Default Props
 */
NoRecordsFound.defaultProps = {
  open: false,
};

export default NoRecordsFound;

/**
 * @description Custom Styling
 */
const StyledNoRecordFound = styled(Typography)(({ theme }: { theme: any }) => ({
  width: "fit-content",
  margin: "2% auto",
}));
