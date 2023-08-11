import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Box,
  Paper,
  styled,
  Grid,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import {
  columns,
  DEFAULT_NOTIFICATION,
  DEFAULT_SEARCH_TRANSACTION_DATA,
  DIRECTION_OPTIONS,
  processOptions,
  TITLES,
} from "../../configs";
import { SEARCH_TRANSACTION_API } from "../../configs/api";
import { APP_ROUTES } from "../../configs/routes";
import { ICONS } from "../../configs/imageContainer";
import { ERROR_MESSAGES } from "../../configs/messages";
import {
  dropDownMenuStyling,
  selectFieldStyling,
  selectFieldStylingWithActive,
  textFieldStyling,
} from "../../configs/style";

import {
  setTransactionSummary,
  setTransactionTableData,
  setSearchTransactionFormData,
  setResetSearchTransaction,
  setSelectedTransactionIDs,
} from "../../redux/searchTransaction/searchTransaction.actions";
import { setResetTransactionReport } from "../../redux/transactionReport/actions";

import Transactions from "./Transactions";
import Title from "../../components/Title";
import AppHeader from "../../components/AppHeader";
import ButtonGroup from "../../components/ButtonGroup";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import ShowNotification from "../../components/Notifications";
import CustomizedDatePicker from "../../components/CustomizedDatePicker";

import { httpPost } from "../../utils/http";
import {
  getFormattedDateAndTime,
  getMultipleDateError,
  isValidDate,
} from "../../utils/helper/getFormattedDateAndTime";
import {
  getFormattedParams,
  getFormattedParamsWithIDs,
  getFormattedQueryParams,
} from "../../utils/helper/getFormattedData";
import LocalStorageService from "../../utils/Services/LocalStorageService";
import { getProgrammableDownload } from "../../utils/helper/programmableDownload";

import "./style.css";

/**
 * Interface
 */
interface FormDataInterface {
  transactionRefNo: string;
  ourIbanNumber: string;
  otherBankCode: string;
  otherBankIban: string;
  direction: string;
  process: string;
  batchId: string;
  startDate: string;
  endDate: string;
}

export default function SearchTransaction() {
  const location = useLocation();
  const dispatch = useDispatch();

  // get values from store
  const { searchTransactionFormData }: any = useSelector(
    ({ searchTransaction }: { searchTransaction: object }) => searchTransaction
  );

  // if any value stored in store
  const isFormDataStored = Object.values(searchTransactionFormData).some(
    (value) => value && value
  );

  const isBatchIdAvailable = location?.state?.batchID;

  const [batch, setBatch] = useState(isBatchIdAvailable);
  const [formData, setFormData] = useState<FormDataInterface | any>(
    isFormDataStored
      ? searchTransactionFormData
      : DEFAULT_SEARCH_TRANSACTION_DATA
  );
  const [tableRows, setTableRows] = useState([]);
  const [noOfRows, setNoOfRows] = useState(10);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState();

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isStatus, setStatus] = useState(false);
  const [errorText, setError] = useState({ startDate: "", endDate: "" });
  const [inputType, setInputType] = useState("");
  const [selectedInternalIDs, setInternalIDs]: number[] | any = useState([]);

  /**
   * @description calling batch data for batch file
   */
  useEffect(() => {
    isBatchIdAvailable && setLoading(true);
    setFormData({ ...formData, batchId: isBatchIdAvailable });

    isFormDataStored &&
      getTransactionReport(
        searchTransactionFormData?.page,
        searchTransactionFormData?.pageSize
      );
    getBatchData();
    setLoading(false);
  }, []);

  /**
   * @description Handling form data
   *
   * @param event
   * @returns
   */
  const handleFormData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const {
      target: { name = "", value = null },
    } = event || {};

    switch (name) {
      case "transactionRefNo":
        setFormData({ ...formData, [name]: value });
        return;

      case "ourIbanNumber":
        setFormData({ ...formData, [name]: value });
        return;

      case "otherBankCode":
        setFormData({ ...formData, [name]: value });
        return;

      case "otherBankIban":
        setFormData({ ...formData, [name]: value });
        return;

      case "direction":
        setFormData({ ...formData, [name]: value });
        return;

      case "process":
        setFormData({ ...formData, [name]: value });
        return;

      case "batchId":
        setBatch(value);
        setFormData({ ...formData, [name]: value });

        return;

      default:
        return { ...formData };
    }
  };

  /**
   * @description Handle From(start) date
   * @param {Object} date
   */
  const handleStartDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const isValidStartDate = isValidDate(date);

    setError({
      ...errorText,
      startDate: !isValidStartDate ? ERROR_MESSAGES.invalid_start_date : "",
    });
    setFormData({
      ...formData,
      startDate: date,
      endDate: null,
    });
  };

  /**
   * @description Handle to(end) date
   * @param {Object} date
   */
  const handleEndDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const isValidEndDate = isValidDate(date);

    setError({
      ...errorText,
      endDate: !isValidEndDate ? ERROR_MESSAGES.invalid_end_date : "",
    });
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  /**
   * @description: Get Transactions report
   *
   * @params {Number|String} pageNo
   * @params {Number|String} pageSize
   *
   */
  const getTransactionReport = async (
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

      const newFormattedParams = getFormattedParams({
        ...formData,
        isBatch: null,
      });

      let url = SEARCH_TRANSACTION_API.GET_TRANSACTION.replace(
        "#page_number#",
        String(Number(pageNo) + 1)
      ).replace("#page_size#", String(pageSize));

      // formatting form data as per batch id if available
      if (Boolean(batch)) {
        newFormattedParams.batchId = batch;
      }

      // pass count to pagination
      const response = await httpPost(url, newFormattedParams);

      // in case of error
      if (Boolean(response?.isError)) {
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
        paymentInstructions = [],
        currPageNumber = 0,
        totalNumberOfRows = 10,
      } = data || {};
      LocalStorageService.setData("page", pageNo);

      const formattedPaymentInstructions = paymentInstructions.map(
        (data: object) => {
          const { date = "" } = (data as { date: string }) || {};

          return {
            ...data,
            date: getFormattedDateAndTime(date),
            isSelected: false,
          };
        }
      );

      setStatus(Boolean(status));
      setTableRows(formattedPaymentInstructions);
      setNoOfRows(totalNumberOfRows);
      setPage(currPageNumber);
      setPageSize(pageSize);

      // store data in redux store
      dispatch(
        setSearchTransactionFormData({
          ...newFormattedParams,
          pageSize: pageSize,
          page: pageNo,
        })
      );
      dispatch(setTransactionSummary(data));
      dispatch(setTransactionTableData(formattedPaymentInstructions));

      if (data) {
        setLoading(false);
      }
      return formattedPaymentInstructions;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description: Get batch data if batch ID available
   */
  const getBatchData = () => {
    if (Boolean(isBatchIdAvailable)) {
      setTimeout(() => {
        getTransactionReport(page, pageSize);
      }, 100);
    }
  };

  /**
   * @description: Clearing form
   */
  const handleClearForm = () => {
    setFormData(DEFAULT_SEARCH_TRANSACTION_DATA);
    setError({ startDate: "", endDate: "" });

    dispatch(setResetSearchTransaction());
    dispatch(setResetTransactionReport());
    dispatch(setSearchTransactionFormData(DEFAULT_SEARCH_TRANSACTION_DATA));
    setInternalIDs([]);
    dispatch(setSelectedTransactionIDs([]));
    setStatus(false);
  };

  /**
   * @description getting result on search button Click
   */
  const handleSearchResults = () => {
    setInternalIDs([]);
    setPage(0);
    getTransactionReport(0, pageSize);
  };

  /**
   * @description Storing selected rows payment IDs
   *
   * @param {Array} internalIDs
   */
  const getInternalPaymentIDs = (internalIDs: number[]) => {
    setInternalIDs(internalIDs);
  };

  /**
   * @description Download CSV
   */
  const getDownloadCSV = async () => {
    try {
      setLoading(true);
      setOpenNotification(false);

      // Get formatted Query
      let query = "";

      query = getFormattedQueryParams(
        !formData.batchId ? { ...formData, batchId: "null" } : formData
      );

      // const url = `${SEARCH_TRANSACTION_API.DOWNLOAD_TRANSACTIONS}?${query}`;
      // temporary API
      const url = `https://microservices-sit-npss.mashreqdev.com/api/uaeipp-core-ui-backend-services/downloadTransactions?${query}`;

      const response = await getProgrammableDownload({
        url,
        target: "_blank",
        fileName: "transaction_detail",
        extension: "csv",
      });

      // in case of error
      if (Boolean(response?.isError)) {
        setOpenNotification(true);
        setNotifications({
          ...notifications,
          isError: true,
          statusCode: response?.statusCode,
          msgType: "failed",
          failedMsgTitle: response?.msg,
          msg: ERROR_MESSAGES.downloading_error,
          isFailedButtonShow: true,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in CSV download.", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   *  @description Download XML
   */
  const getDownloadXML = async () => {
    try {
      setLoading(true);
      setOpenNotification(false);

      // Get formatted Query
      let query = "";

      query = getFormattedParamsWithIDs({
        params: !formData.batchId ? { ...formData, batchId: "null" } : formData,
        string: "internalPaymentIds",
        paymentIDs: selectedInternalIDs,
      });

      // const url = `${SEARCH_TRANSACTION_API.DOWNLOAD_TRANSACTIONS}?${query}`;
      // temporary API
      const url = `https://microservices-sit-npss.mashreqdev.com/api/uaeipp-core-ui-backend-services/downloadPacs?${query}`;

      const response = await getProgrammableDownload({
        url,
        target: "_blank",
        fileName: "pac_message",
        extension: "zip",
      });

      // in case of error
      if (Boolean(response?.isError)) {
        setOpenNotification(true);
        setNotifications({
          ...notifications,
          isError: true,
          statusCode: response?.statusCode,
          msgType: "failed",
          failedMsgTitle: response?.msg,
          msg: ERROR_MESSAGES.downloading_error,
          isFailedButtonShow: true,
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error in XML download.", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Handle select focus
   *
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

        case "process":
          return setInputType("process");

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

  const {
    transactionRefNo,
    ourIbanNumber,
    otherBankCode,
    otherBankIban,
    direction,
    process,
    batchId,
    startDate,
    endDate,
  } = formData || {};

  return (
    <div className="search-transaction-paper">
      {isLoading && <BackdropLoader />}

      {!isLoading && openNotification && notifications?.isError && isSubmit && (
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
        showBreadcrumbs={false}
        match={APP_ROUTES.SEARCH_TRANSACTION}
      />

      <StyledPaper elevation={2} onClick={handleSelectClose}>
        <Title title={TITLES.SEARCH_TRANSACTION} />

        <StyledPaperInner elevation={3} onClick={handleSelectClose}>
          <form id="form" onClick={handleSelectClose}>
            <Grid
              container
              className="search-transaction-input-container"
              spacing={2}
            >
              <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <StyledTextField
                    className="caret"
                    label="Transaction Ref No"
                    placeholder="Transaction Ref No"
                    value={transactionRefNo}
                    name="transactionRefNo"
                    onChange={handleFormData}
                    // disabled={isBatchIdAvailable}
                    sx={textFieldStyling}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <StyledTextField
                    className="caret"
                    label="Our Bank IBAN"
                    placeholder="Our Bank IBAN"
                    value={ourIbanNumber}
                    name="ourIbanNumber"
                    onChange={handleFormData}
                    // disabled={isBatchIdAvailable}
                    sx={textFieldStyling}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <StyledTextField
                    className="caret"
                    label="Other Bank Code"
                    placeholder="Other Bank Code"
                    value={otherBankCode}
                    name="otherBankCode"
                    onChange={handleFormData}
                    // disabled={isBatchIdAvailable}
                    sx={textFieldStyling}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <StyledTextField
                    className="caret"
                    label="Other Bank IBAN"
                    placeholder="Other Bank IBAN"
                    value={otherBankIban}
                    name="otherBankIban"
                    onChange={handleFormData}
                    // disabled={isBatchIdAvailable}
                    sx={textFieldStyling}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid xs={6} item className="search-transaction-input" md={4}>
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
                    labelId="direction-label direction"
                    data-testid="direction_id"
                    value={direction}
                    label="Direction"
                    placeholder="Direction"
                    className="select-input caret"
                    name="direction"
                    // disabled={isBatchIdAvailable}
                    sx={
                      inputType == "direction"
                        ? selectFieldStyling
                        : selectFieldStylingWithActive
                    }
                    MenuProps={dropDownMenuStyling}
                    onChange={handleFormData}
                    onClose={handleSelectClose}
                    onFocus={handleSelectFocus("direction")}
                  >
                    {DIRECTION_OPTIONS.map((options, index) => {
                      return (
                        <MenuItem
                          data-testid={`direction_option`}
                          key={`${options}-${index}`}
                          value={options}
                        >
                          {options}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <InputLabel
                    id={
                      inputType == "process"
                        ? "select-label-focus"
                        : "select-label"
                    }
                  >
                    Process
                  </InputLabel>

                  <Select
                    labelId="process-select"
                    sx={
                      inputType == "process"
                        ? selectFieldStyling
                        : selectFieldStylingWithActive
                    }
                    MenuProps={dropDownMenuStyling}
                    value={process}
                    label="Process"
                    placeholder="Process"
                    className="select-input caret"
                    name="process"
                    // disabled={isBatchIdAvailable}
                    displayEmpty
                    onChange={handleFormData}
                    onClose={handleSelectClose}
                    onFocus={handleSelectFocus("process")}
                  >
                    {processOptions.map((options, index) => {
                      return (
                        <MenuItem key={`${options}-${index}`} value={options}>
                          {options}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid> */}

              {/* <Grid xs={6} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <StyledTextField
                    className="caret"
                    label="Batch ID"
                    placeholder="Batch ID"
                    value={batch ?? batchId}
                    name="batchId"
                    onChange={handleFormData}
                    sx={textFieldStyling}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid> */}

              <Grid xs={12} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <CustomizedDatePicker
                        date={startDate}
                        onDateChange={handleStartDate}
                        format={"YYYY-MM-DD"}
                        label={"From"}
                        name={"from"}
                        errorText={isSubmit && errorText.startDate}
                        minDate={""}
                        isDisabled={false}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid xs={12} item className="search-transaction-input" md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <CustomizedDatePicker
                        date={startDate && endDate}
                        onDateChange={handleEndDate}
                        format={"YYYY-MM-DD"}
                        label={"To"}
                        name={"to"}
                        errorText={isSubmit && errorText.endDate}
                        minDate={startDate}
                        isDisabled={!startDate}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid xs={12} item md={6}>
                <Box sx={{ visibility: "hidden" }}> </Box>
              </Grid>
              <Grid xs={12} item md={6}>
                <Box sx={{ visibility: "hidden" }}> </Box>
              </Grid>
              <Grid xs={12} item md={6} className="search-transaction-input">
                <ButtonGroup
                  onPrimaryBtnClick={handleSearchResults}
                  onSecondaryBtnClick={handleClearForm}
                  primaryButtonText={"Search"}
                  isClearButtonEnabled={true}
                  clearButtonText={"Clear"}
                />
              </Grid>
            </Grid>
          </form>
        </StyledPaperInner>

        <Box style={searchResult}>
          {isStatus && (
            <Box className="result-title">
              <Title title={TITLES.RESULT} />

              {tableRows.length > 0 && (
                <>
                  {/* <Box className="download-button-container"> */}
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
                    onClick={getDownloadCSV}
                  >
                    Export to Excel
                  </Button>
                  {/* <Button
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
                      onClick={getDownloadXML}
                    >
                      Download PACs Messages
                    </Button> */}
                  {/* </Box> */}

                  {/* <ButtonGroupDownload
                    onDownloadCSV={getDownloadCSV}
                    onDownloadXML={getDownloadXML}
                    buttonTypes={["xml,csv"]}
                  /> */}
                </>
              )}
            </Box>
          )}

          <Transactions
            columns={columns}
            tableRows={tableRows}
            onTransactionReport={getTransactionReport}
            noOfRows={noOfRows}
            page={page}
            status={isStatus}
            onInternalPaymentIDs={getInternalPaymentIDs}
            pageSize={pageSize}
          />
        </Box>
      </StyledPaper>
    </div>
  );
}

/**
 * Custom Styling
 */
const searchResult = {
  width: "100%",
  marginTop: "5%",
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "4% auto",
  padding: "2% 4%",
}));

const StyledPaperInner = styled(Paper)(({ theme }) => ({
  width: "94%",
  margin: "0",
  padding: "4% 4% 2% 2% ",
  backgroundColor: "#f5f6f9",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({}));
