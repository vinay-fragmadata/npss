import React, { useState } from "react";
import { Grid, FormControl, Stack, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { SUCCESS_TRANSACTION_HEADERS } from "./configs";
import { BUTTON_TEXTS, DEFAULT_NOTIFICATION, TITLES } from "../../configs";

import SuccessTransactions from "./TatReports";
import VolumeReport from "./VolumeReport";
import AppHeader from "../../components/AppHeader";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import ShowNotification from "../../components/Notifications";
import Title from "../../components/Title";
import CustomizedDatePicker from "../../components/CustomizedDatePicker";
import ButtonGroup from "../../components/ButtonGroup";

import { getDateErrors } from "../../utils/helper/getFormattedDateAndTime";
import { fetchDataFromMultipleEndPoints } from "../../utils/helper/fetchData";

import { StyledPaper, StyledPaperInner } from "./StyledComponents";

/**
 * Dashboard default form data
 */
export const DEFAULT_DASHBOARD_DATA = {
  date: null,
};

/**
 * @description volume report and tat report
 */
export const DEFAULT_API_RES = {
  isVolumeReport: false,
  isTatReport: false,
};

/**
 * Interface
 */
interface IFormDataInterface {
  date: string;
}

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);
  const [errorText, setError] = useState({ date: "" });
  const [isSubmit, setSubmit] = useState(false);
  const [isStatus, setStatus] = useState(false);
  const [apiResponse, setApiRes] = useState(DEFAULT_API_RES);
  const [succTranRows, setSuccTranRows] = useState([]);
  const [tatRows, setTatRows] = useState<any[]>([]);

  const [formData, setFormData] = useState<IFormDataInterface | any>(
    DEFAULT_DASHBOARD_DATA
  );

  /**
   * @description data formation for Volume Report Rows
   * @param {object} rawData
   * @returns {array}
   */
  const getFormattedVolReportRows = (rawData: object) => {
    if (!rawData) return;

    const firstLayerKeys = Object.keys(rawData);
    const firstLayerValues = Object.values(rawData);

    const dataFormation = firstLayerKeys.map((_, index) => {
      const secondLayerKeys: any[] = Object.keys(firstLayerValues[index]);
      const secondLayerValues: any[] = Object.values(firstLayerValues[index]);

      return secondLayerKeys.map((_, secondLayerIndex) => {
        const thirdLayerKeys = Object.keys(secondLayerValues[secondLayerIndex]);
        const thirdLayerValues: any[] = Object.values(
          secondLayerValues[secondLayerIndex]
        );

        return thirdLayerKeys.map((_, thirdLayerIndex) => {
          const fourthLayerValues = Object.values(
            thirdLayerValues[thirdLayerIndex]
          );
          return fourthLayerValues;
        });
      });
    });

    const apiDataArr: any = dataFormation.map((singleArr) => {
      return singleArr.flat().flat();
    });

    setSuccTranRows(apiDataArr);
  };

  /**
   * @description data formation for Success Transaction or TAT
   * @param {object} rawData
   * @returns {array}
   */
  const getFormattedTatRows = (rawData: object) => {
    if (!rawData) return;

    const firstLayerKeys = Object.keys(rawData);
    const firstLayerValues = Object.values(rawData);

    const dataFormation: any[][] = firstLayerKeys.map((_, firstLayerKey) => {
      const secondLayerKeys = Object.keys(firstLayerValues[firstLayerKey]);
      const secondLayerValues: any[][][] = Object.values(
        firstLayerValues[firstLayerKey]
      );

      return secondLayerKeys.map((_, secondKeyIndex) => {
        let headers = SUCCESS_TRANSACTION_HEADERS[1].map(
          ({ label = "" }: { label: any }, index) => {
            if (index < 2) return;

            return secondLayerValues[secondKeyIndex][label.toLowerCase()];
          }
        );

        headers = headers.filter((header) => header);

        return headers;
      });
    });

    setTatRows(dataFormation.flat());
  };

  /**
   * @description: Handling states
   *
   * @param {String }_ event
   */
  const handleSelectClose = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    // setInputType("");
  };

  /**
   * @description: Clearing form
   */
  const handleClearForm = () => {
    setFormData(DEFAULT_DASHBOARD_DATA);
    setError({ date: "" });
  };

  /**
   * @description getting result on search button Click
   */
  const handleSearchResults = async () => {
    try {
      setError({
        date: getDateErrors(formData.date),
      });

      setSubmit(true);

      if (isLoading || !Boolean(formData.date) || Boolean(errorText.date))
        return;

      setLoading(true);
      setOpenNotification(false);
      if (isStatus) setStatus(false);

      // TODO: Temp base using API
      // getVolumeReport API
      let api = `https://microservices-sit-npss.mashreqdev.com/api/uaeipp-core-ui-backend-services/getVolumeReport?reportDate=#DATE#`;
      api = api.replace("#DATE#", formData.date);

      // getTatReport API
      let tatAPI = `https://microservices-sit-npss.mashreqdev.com/api/uaeipp-core-ui-backend-services/getTatReport?reportDate=#DATE#`;
      tatAPI = tatAPI.replace("#DATE#", formData.date);

      const [volumeReport, tatReport] = await fetchDataFromMultipleEndPoints([
        api,
        tatAPI,
      ]);

      const { data: volumeData, status: volumeStatus } = volumeReport || {};
      const { data: tatData, status: tatStatus } = tatReport || {};

      getFormattedVolReportRows(volumeData);
      getFormattedTatRows(tatData);

      // in case of error
      if (Boolean(volumeReport?.isError) || Boolean(tatReport?.isError)) {
        setOpenNotification(true);
        setNotifications({
          ...notifications,
          isError: true,
          statusCode: volumeReport?.statusCode || tatReport?.statusCode,
          msgType: "failed",
          failedMsgTitle: volumeReport?.msg || tatReport?.msg,
          msg: volumeReport?.msg || tatReport?.msg,
          isFailedButtonShow: true,
        });
      }

      setApiRes({
        ...apiResponse,
        isVolumeReport: Boolean(volumeStatus == 200),
        isTatReport: Boolean(tatStatus == 200),
      });

      setStatus(Boolean(volumeStatus) && Boolean(tatStatus));
      setSubmit(false);
    } catch (error) {
      console.error("--error in search dashboard--", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Handle From(start) date
   * @param {Object} date
   */
  const handleDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const dateError = getDateErrors(date);

    setError({
      date: dateError,
    });
    setFormData({
      ...formData,
      date: date,
    });
  };

  return (
    <>
      <div className="dashboard-paper">
        <AppHeader showBreadcrumbs={false} />
        {isLoading && <BackdropLoader />}

        {!isLoading && openNotification && notifications?.isError && (
          <ShowNotification
            failedMsgTitle={"Failed"}
            msg={notifications?.msg}
            isError={notifications?.isError}
            msgType={notifications?.msgType}
            statusCode={notifications?.statusCode}
            openNotification={openNotification}
            onOpenNotification={undefined}
            onRedirect={undefined}
          />
        )}

        <StyledPaper elevation={2}>
          <Title title={TITLES.FILTERS} />

          <StyledPaperInner
            elevation={3}
            onClick={handleSelectClose}
            sx={{ marginBottom: "5%" }}
          >
            <form id="form" onClick={handleSelectClose}>
              <Grid
                container
                className="search-transaction-input-container"
                spacing={2}
              >
                <Grid xs={12} md={4} item className="search-transaction-input">
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <CustomizedDatePicker
                          date={formData.date}
                          onDateChange={handleDate}
                          format={"YYYY-MM-DD"}
                          label={"Date"}
                          name={"Date"}
                          errorText={isSubmit && errorText.date}
                          minDate={""}
                          isDisabled={false}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid xs={6} item md={2}>
                  <Box sx={{ visibility: "hidden" }}> </Box>
                </Grid>

                <Grid xs={12} item md={6}>
                  <ButtonGroup
                    onPrimaryBtnClick={handleSearchResults}
                    onSecondaryBtnClick={handleClearForm}
                    primaryButtonText={BUTTON_TEXTS.SEARCH}
                    clearButtonText={BUTTON_TEXTS.CLEAR}
                    isClearButtonEnabled={true}
                  />
                </Grid>
              </Grid>
            </form>
          </StyledPaperInner>

          {apiResponse.isVolumeReport && (
            <VolumeReport title={"Volume Report"} rowsData={succTranRows} />
          )}

          {apiResponse.isTatReport && (
            <SuccessTransactions
              title={"Success Transactions"}
              rowsData={tatRows}
            />
          )}
        </StyledPaper>
      </div>
    </>
  );
};

export default Dashboard;
