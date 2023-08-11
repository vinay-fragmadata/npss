import React from "react";
import Backdrop from "@mui/material/Backdrop";
import SimpleSpinner from "../SimpleSpinner";

const SimpleBackdropLoader = (props: object) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#838383",
          background: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)",
        }}
        open={true}
      >
        <SimpleSpinner />
      </Backdrop>
    </div>
  );
};

export default SimpleBackdropLoader;
