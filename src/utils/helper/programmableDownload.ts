import { saveAs } from "file-saver";
import { httpsGetDownload } from "../http";

export const getProgrammableDownload = async ({
  url = "",
  target = "_blank",
  fileName = "",
  extension,
}: {
  url: string;
  target: string;
  fileName: string;
  extension: string;
}) => {
  const response: any = await httpsGetDownload(url);
  const revokeURL = window.URL.createObjectURL(
    new Blob([response.data], {
      type: `application/${extension == "zip" ? "zip" : "csv"}`,
    })
  );

  // Downloading Zip folder
  if (extension == "zip") {
    saveAs(revokeURL, "pac-messages.zip");
  } else {
    // Downloading file from response
    const aTag = document.createElement("a");
    aTag.href = revokeURL;
    aTag.setAttribute("target", target);
    aTag.setAttribute("download", `${fileName}.${extension}`);
    aTag.click();
    aTag.remove();
  }

  setTimeout(() => {
    window.URL.revokeObjectURL(revokeURL);
  }, 0);

  return response;
};

/**
 * -------------------------------------------------------------------
 * @description Downloading XML data
 *
 * @param xmlData
 * @returns
 */
export const getXMLDownload = (xml: any, fileName: string = "") => {
  // Format the XML data
  const formattedXML = getFormattedXML(xml);

  // Create a Blob with the formatted XML data
  const blob = new Blob([formattedXML], { type: "text/xml" });

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${fileName}.xml`;

  // Trigger the download
  downloadLink.click();
};

/**
 * @description Formatting XML data
 *
 * @param xmlData
 * @returns
 */
const getFormattedXML = (xmlData: any) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "application/xml");
  const serializer = new XMLSerializer();
  const formattedXML = serializer.serializeToString(xmlDoc);

  return formattedXML;
};
