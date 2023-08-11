import React from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  StyledLoaderContainer,
  StyledLoadingText,
} from "../SimpleSpinner/StyledComponents";
import CustomizedSpinner from "../CustomizedSpinner";

const BackdropLoader = (props: object) => {
  //TODO: USe this code when dynamically open/close backdrop loader
  //   const [open, setOpen] = React.useState(false);

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleToggle = () => {
  //     setOpen(!open);
  //   };

  return (
    <div>
      <Backdrop
        sx={{
          color: "#838383",
          background: "rgba(49, 49, 49, 0.6)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)",
        }}
        open={true}
        // onClick={handleClose}
      >
        <StyledLoaderContainer>
          <CustomizedSpinner />
          <StyledLoadingText>Loading...</StyledLoadingText>
        </StyledLoaderContainer>
      </Backdrop>
    </div>
  );
};

export default BackdropLoader;
