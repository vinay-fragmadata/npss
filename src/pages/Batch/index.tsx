import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import BatchTable from "./BatchTable";

import Title from "../../components/Title";
import AppHeader from "../../components/AppHeader";
import ButtonGroup from "../../components/ButtonGroup";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import CustomizedDatePicker from "../../components/CustomizedDatePicker";
import ShowNotification from "../../components/Notifications";

import {
  BUTTON_TEXTS,
  DEFAULT_BATCH_DATA,
  DEFAULT_NOTIFICATION,
  DIRECTION_OPTIONS,
  FILE_TYPE,
  MESSAGE_TYPE,
  TITLES,
  TRANSACTION_TYPE,
} from "../../configs";
import { ERROR_MESSAGES } from "../../configs/messages";
import { BATCH_SEARCH_API } from "../../configs/api";
import { APP_ROUTES, batchSearch } from "../../configs/routes";
import { BATCH_FILE_SEARCH_HEADERS, SINGLE_BATCH_HEADERS } from "./configs";
import {
  dropDownMenuStyling,
  selectFieldStyling,
  selectFieldStylingWithActive,
} from "../../configs/style";

import {
  StyledContainer,
  StyledPaper,
  StyledPaperInner,
  StyledTransactionResult,
} from "./StyledComponents";

import {
  getFormattedDate,
  getMultipleDateError,
  isValidDate,
} from "../../utils/helper/getFormattedDateAndTime";
import { httpPost } from "../../utils/http";

import {
  setBatchFileSearchRows,
  setBatchPageData,
  setBatchSearchFormData,
  setBatchSearchResults,
  setResetBatch,
} from "../../redux/batch/actions";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFormattedParams } from "../../utils/helper/getFormattedData";

/**
 * @description Interfaces
 */
interface FormDataInterface {
  startDate: string;
  endDate: string;
  direction: string;

  // batch search
  transactionType: string;

  // Batch file search
  fileType: string;
  messageType: string;
}

const Batch = () => {
  const dispatch = useDispatch();
  const isBatchSearch = Boolean(window.location.href.includes(batchSearch));

  // // get values from store
  const { batchFormData }: any = useSelector(
    ({ batch }: { batch: object }) => batch
  );

  // if any value stored in store
  const isFormDataStored = Object.values(batchFormData).some(
    (value) => value && value
  );

  const [formData, setFormData] = useState<FormDataInterface | any>(
    isFormDataStored ? batchFormData : DEFAULT_BATCH_DATA
  );
  const [isLoading, setLoading] = useState(false);
  const [batchFileSearchRows, setBatchFileSearch] = useState([]);
  const [batchSearchRows, setBatchSearchRows] = useState([]);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);

  const [errorText, setError] = useState({ startDate: "", endDate: "" });
  const [isSubmit, setSubmit] = useState(false);
  const [isStatus, setStatus] = useState(false);
  const [inputType, setInputType] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState();
  const [noOfRows, setNoOfRows] = useState(10);

  React.useEffect(() => {
    return () => {
      setFormData(DEFAULT_BATCH_DATA);
    };
  }, [isBatchSearch]);

  /**
   * @description calling batch data for batch file
   */
  React.useEffect(() => {
    setLoading(true);

    isFormDataStored &&
      fetchBatchData(batchFormData?.page, batchFormData?.pageSize);
    setLoading(false);
  }, []);

  /**
   * @description Handle start date
   *
   * @param {String} date
   */
  const handleStartDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const isValidStartDate = isValidDate(date);

    setError({
      ...errorText,
      startDate: !isValidStartDate ? ERROR_MESSAGES.invalid_start_date : "",
    });
    setFormData({ ...formData, startDate: date, endDate: null });
  };

  /**
   * @description Handle end date
   *
   * @param {String} date
   */
  const handleEndDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const isValidEndDate = isValidDate(date);

    setError({
      ...errorText,
      endDate: !isValidEndDate ? ERROR_MESSAGES.invalid_end_date : "",
    });

    setFormData({ ...formData, endDate: date });
  };

  /**
   * @description Adding values in form data
   *
   * @param {Object} event
   * @returns
   */
  const handleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const {
      target: { name = "", value = "" },
    } = event || {};

    switch (name) {
      case "fileType":
      case "messageType":
      case "direction":
      case "transactionType":
        setFormData({ ...formData, [name]: value });
        return;

      default:
        return { ...formData };
    }
  };

  /**
   * @description Fetch details for batch file search or batch search as per batch type
   *
   * @returns
   */
  const fetchBatchData = async (
    pageNo: number | string = 0,
    pageSize: number | string = 10
  ) => {
    try {
      setSubmit(true);

      const havingError = await getMultipleDateError(
        formData.startDate,
        formData.endDate
      );

      const dateError = { ...errorText, ...havingError };

      await setError(dateError);

      if (
        isLoading ||
        Boolean(errorText.startDate || dateError.startDate) ||
        Boolean(errorText.endDate || dateError.endDate)
      )
        return;

      if (isStatus) setStatus(false);

      setLoading(true);
      setOpenNotification(false);

      let url = "";

      const newFormattedParams = getFormattedParams({
        ...formData,
      });

      // use single search api
      if (isBatchSearch) {
        url = BATCH_SEARCH_API.BATCH_SEARCH.replace(
          "#PAGE_NUMBER#",
          String(Number(pageNo) + 1)
        ).replace("#PAGE_SIZE#", String(pageSize));

        delete newFormattedParams?.fileType;
        delete newFormattedParams?.messageType;

        const response = await httpPost(url, newFormattedParams);

        // in case of error
        if ((response?.isError || !response) && response.status != "200") {
          setOpenNotification(true);
          setNotifications({
            ...notifications,
            isError: true,
            statusCode: response?.statusCode,
            msgType: "failed",
            failedMsgTitle: response?.msg,
            msg: response?.msg,
            isFailedButtonShow: true,
          });
        }

        const { data, status } = response || {};
        const {
          batchResultDetails = [],
          currPageNumber = 0,
          totalNumberOfRows = 10,
        } = data || {};

        const formattedResult = batchResultDetails.map((result: object) => {
          const { createdOn = "" } = (result as { createdOn: string }) || {};

          return { ...result, createdOn: getFormattedDate(createdOn) };
        });

        // Storing values in State
        setBatchSearchRows(formattedResult);
        setStatus(Boolean(status));
        setPage(currPageNumber);
        setPageSize(pageSize);
        setNoOfRows(totalNumberOfRows);

        // Storing values in Redux store
        dispatch(
          setBatchSearchFormData({
            ...newFormattedParams,
            pageSize: pageSize,
            page: page,
          })
        );
        dispatch(setBatchSearchResults(formattedResult));
        dispatch(
          setBatchPageData({
            batchSearchPage: pageNo,
            batchSearchPageSize: pageSize,
            batchFileSearchPage: null,
            batchFileSearchPageSize: null,
          })
        );

        if (status === 200) setLoading(false);
      } else {
        url = BATCH_SEARCH_API.BATCH_FILE_SEARCH.replace(
          "#PAGE_NUMBER#",
          String(Number(pageNo) + 1)
        ).replace("#PAGE_SIZE#", String(pageSize));

        delete newFormattedParams?.transactionType;

        const response = await httpPost(url, newFormattedParams);

        // in case of error
        if ((response?.isError || !response) && response.status != "200") {
          setOpenNotification(true);
          setNotifications({
            ...notifications,
            isError: true,
            statusCode: response?.statusCode,
            msgType: "failed",
            failedMsgTitle: response?.msg,
            msg: response?.msg,
            isFailedButtonShow: true,
          });
        }

        const { data, status } = response || {};
        const {
          batchFileResultDetails = [],
          currPageNumber = 1,
          totalNumberOfRows = 10,
        } = data || {};

        // formatting date in response
        const formattedBatchFileData = batchFileResultDetails.map(
          (result: object) => {
            const { receivedOn = "" } =
              (result as { receivedOn: string }) || {};

            return {
              ...result,
              receivedOn: getFormattedDate(receivedOn),
            };
          }
        );

        // Storing values in State
        setBatchFileSearch(formattedBatchFileData);
        setPage(currPageNumber);
        setPageSize(pageSize);
        setNoOfRows(totalNumberOfRows);
        setStatus(Boolean(status));

        // Storing values in Redux store
        dispatch(
          setBatchSearchFormData({
            ...newFormattedParams,
            pageSize: pageSize,
            page: page,
          })
        );
        dispatch(setBatchFileSearchRows(formattedBatchFileData));
        dispatch(
          setBatchPageData({
            batchSearchPage: null,
            batchSearchPageSize: null,
            batchFileSearchPage: pageNo,
            batchFileSearchPageSize: pageSize,
          })
        );

        if (status === 200) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Clearing the form
   */
  const getClearForm = () => {
    setFormData(DEFAULT_BATCH_DATA);
    setError({ startDate: "", endDate: "" });

    dispatch(setResetBatch());
  };

  /**
   * @description Handle select focus
   * @param {String} selectType
   * @returns
   */
  const handleSelectFocus =
    (selectType: string) =>
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
      setInputType("");

      switch (selectType) {
        case "direction":
          return setInputType("direction");

        case "transactionType":
          return setInputType("transactionType");

        case "messageType":
          return setInputType("messageType");

        case "fileType":
          return setInputType("fileType");

        default:
          return setInputType("");
      }
    };

  /**
   * @description: Handling states
   *
   * @param {String }_ event
   */
  const handleSelectClose = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setInputType("");
  };

  /**
   * @description getting result on search button Click
   */
  const handleSearchResults = () => {
    setPage(0);
    fetchBatchData(0, pageSize);
  };

  const {
    endDate,
    startDate,
    direction,
    messageType,
    transactionType,
    fileType,
  } = formData || {};

  return (
    <StyledContainer className="batch-container">
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

      <AppHeader
        showBreadcrumbs={true}
        match={
          isBatchSearch ? APP_ROUTES.BATCH_SEARCH : APP_ROUTES.BATCH_FILE_SEARCH
        }
      />

      <StyledPaper elevation={2}>
        <Title
          title={
            isBatchSearch
              ? TITLES.BATCH.BATCH_SEARCH
              : TITLES.BATCH.BATCH_FILE_SEARCH
          }
        />

        <StyledPaperInner elevation={3} onClick={handleSelectClose}>
          <Grid
            container
            className="batch-input-container"
            spacing={2}
            onClick={handleSelectClose}
          >
            <Grid xs={6} item className="batch-input" md={4}>
              <FormControl fullWidth>
                <CustomizedDatePicker
                  date={startDate}
                  onDateChange={handleStartDate}
                  format={"YYYY-MM-DD"}
                  label={"From"}
                  name={"from"}
                  minDate={""}
                  errorText={isSubmit && errorText.startDate}
                  isDisabled={false}
                />
              </FormControl>
            </Grid>
            <Grid xs={6} item className="batch-input" md={4}>
              <FormControl fullWidth>
                <CustomizedDatePicker
                  date={endDate}
                  onDateChange={handleEndDate}
                  format={"YYYY-MM-DD"}
                  label={"To"}
                  name={"to"}
                  errorText={isSubmit && errorText.endDate}
                  minDate={startDate}
                  isDisabled={!startDate}
                />
              </FormControl>
            </Grid>

            {!isBatchSearch && (
              <>
                <Grid
                  xs={6}
                  item
                  className="batch-input"
                  md={4}
                  onClick={handleSelectClose}
                >
                  <FormControl fullWidth onClick={handleSelectClose}>
                    <InputLabel
                      id={
                        inputType == "fileType"
                          ? "select-label-focus"
                          : "select-label"
                      }
                    >
                      File Type
                    </InputLabel>
                    <Select
                      labelId="messageType"
                      id="messageType"
                      value={fileType}
                      label="File Type"
                      className="select-input"
                      name="fileType"
                      sx={
                        inputType == "fileType"
                          ? selectFieldStyling
                          : selectFieldStylingWithActive
                      }
                      MenuProps={dropDownMenuStyling}
                      onChange={handleSelect}
                      onClose={handleSelectClose}
                      onFocus={handleSelectFocus("fileType")}
                    >
                      {FILE_TYPE.map((options, index) => {
                        return (
                          <MenuItem key={`${options}-${index}`} value={options}>
                            {options}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={6} item className="batch-input" md={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id={
                        inputType == "messageType"
                          ? "select-label-focus"
                          : "select-label"
                      }
                    >
                      Message Type
                    </InputLabel>
                    <Select
                      labelId="messageType"
                      id="messageType"
                      value={messageType}
                      label="Message Type"
                      className="select-input"
                      name="messageType"
                      sx={
                        inputType == "messageType"
                          ? selectFieldStyling
                          : selectFieldStylingWithActive
                      }
                      MenuProps={dropDownMenuStyling}
                      onChange={handleSelect}
                      onFocus={handleSelectFocus("messageType")}
                      onClose={handleSelectClose}
                    >
                      {MESSAGE_TYPE.map((options, index) => {
                        return (
                          <MenuItem key={`${options}-${index}`} value={options}>
                            {options}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {isBatchSearch && (
              <Grid xs={6} item className="batch-input" md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    id={
                      inputType == "transactionType"
                        ? "select-label-focus"
                        : "select-label"
                    }
                  >
                    Transaction Type
                  </InputLabel>
                  <Select
                    labelId="direction"
                    id="direction"
                    value={transactionType}
                    label="Transaction Type"
                    className="select-input"
                    name="transactionType"
                    sx={
                      inputType == "transactionType"
                        ? selectFieldStyling
                        : selectFieldStylingWithActive
                    }
                    MenuProps={dropDownMenuStyling}
                    onChange={handleSelect}
                    onFocus={handleSelectFocus("transactionType")}
                    onClose={handleSelectClose}
                  >
                    {TRANSACTION_TYPE.map((options, index) => {
                      return (
                        <MenuItem key={`${options}-${index}`} value={options}>
                          {options}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid xs={6} item className="batch-input" md={4}>
              <FormControl fullWidth>
                <InputLabel
                  id={
                    inputType == "direction"
                      ? "select-label-focus"
                      : "select-label"
                  }
                >
                  Direction
                </InputLabel>
                <Select
                  labelId="direction"
                  id="direction"
                  value={direction}
                  label="Direction"
                  className="select-input"
                  name="direction"
                  sx={
                    inputType == "direction"
                      ? selectFieldStyling
                      : selectFieldStylingWithActive
                  }
                  MenuProps={dropDownMenuStyling}
                  onChange={handleSelect}
                  onFocus={handleSelectFocus("direction")}
                  onClose={handleSelectClose}
                >
                  {DIRECTION_OPTIONS.map((options, index) => {
                    return (
                      <MenuItem key={`${options}-${index}`} value={options}>
                        {options}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} onClick={handleSelectClose}>
            <Grid xs={6} item md={6}>
              <Box sx={{ visibility: "hidden" }}> </Box>
            </Grid>

            <Grid xs={6} item md={6}>
              <ButtonGroup
                onPrimaryBtnClick={handleSearchResults}
                onSecondaryBtnClick={getClearForm}
                primaryButtonText={BUTTON_TEXTS.SEARCH}
                isClearButtonEnabled={true}
                clearButtonText={BUTTON_TEXTS.CLEAR}
              />
            </Grid>
          </Grid>
        </StyledPaperInner>

        <StyledTransactionResult>
          {isStatus && <Title title={TITLES.RESULT} />}

          <BatchTable
            columns={
              isBatchSearch ? SINGLE_BATCH_HEADERS : BATCH_FILE_SEARCH_HEADERS
            }
            tableRows={isBatchSearch ? batchSearchRows : batchFileSearchRows}
            noOfRows={noOfRows}
            page={1}
            onBatchReport={fetchBatchData}
            isBatchSearchClicked={isBatchSearch}
            status={isStatus}
          />
        </StyledTransactionResult>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Batch;
