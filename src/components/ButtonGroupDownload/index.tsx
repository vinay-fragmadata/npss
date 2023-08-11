import React from "react";
import { Box, Button } from "@mui/material";
import { ICONS } from "../../configs/imageContainer";

const ButtonGroupDownload = ({
  onDownloadCSV,
  onDownloadXML,
  buttonTypes,
}: {
  onDownloadCSV: any;
  onDownloadXML: any;
  buttonTypes: string[];
}) => {
  if (buttonTypes.length == 0) return;

  /**
   * @description CSV downloading
   */
  const handleDownloadCSV = () => {
    onDownloadCSV();
  };

  /**
   * @description XML downloading
   */
  const handleDownloadXML = () => {
    onDownloadXML();
  };

  return (
    <>
      <Box className="download-button-container">
        {buttonTypes.includes("csv") && (
          <Button
            size="small"
            className="download-button"
            variant="outlined"
            startIcon={
              <img
                className="download-to-icon"
                src={ICONS.downloadToExcel.image}
                alt={ICONS.downloadToExcel.alt}
              />
            }
            onClick={handleDownloadCSV}
          >
            Export to Excel
          </Button>
        )}

        {buttonTypes.includes("xml") && (
          <Button
            size="small"
            className="download-button"
            variant="outlined"
            startIcon={
              <img
                className="download-to-icon"
                src={ICONS.downloadToXML.image}
                alt={ICONS.downloadToXML.alt}
              />
            }
            onClick={handleDownloadXML}
          >
            Download PACs Messages
          </Button>
        )}
      </Box>
    </>
  );
};

export default ButtonGroupDownload;
