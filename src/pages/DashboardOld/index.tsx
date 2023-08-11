import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Box,
  Grid,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import "./dashboard.css";

import {
  CARD_DUMMY_DATA,
  DEFAULT_DASHBOARD_DATA_OLD,
  DEFAULT_NOTIFICATION,
  DIRECTION_OPTIONS,
  isBatchOptions,
  processOptions,
  TITLES,
} from "../../configs";
import { DASHBOARD_API } from "../../configs/api";
import {
  chartData,
  DASHBOARD_TABLE_HEADERS,
  DASHBOARD_TABLE_ROWS,
} from "./configs";

import {
  setTransactionSummary,
  setTransactionTableData,
} from "../../redux/dashboard/dashboard.actions";

import Title from "../../components/Title";
import AppHeader from "../../components/AppHeader";
import ButtonGroup from "../../components/ButtonGroup";
import DashboardCard from "../../components/DashboardCard";
import DashboardTable from "../../components/DashboardCard/DashboardTable";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import ShowNotification from "../../components/Notifications";
import CustomizedDatePicker from "../../components/CustomizedDatePicker";

import { StyledFlexBox } from "../../styledComponents/StyledFlexBox";
import {
  searchResult,
  StyledPaper,
  StyledPaperInner,
  StyledTextField,
} from "./StyledComponents";

import { httpPost } from "../../utils/http";
import { getFormattedDateAndTime } from "../../utils/helper/getFormattedDateAndTime";
import { getFormattedParams } from "../../utils/helper/getFormattedData";

/**
 * @description Form data interfaces
 */
interface FormDataInterface {
  transactionRefNo: string;
  ourIbanNumber: string;
  otherBankCode: string;
  otherBankIban: string;
  direction: string;
  process: string;
  isBatch: string;
  startDate: string;
  endDate: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();

  // states
  const [formData, setFormData] = useState<FormDataInterface | any>(
    DEFAULT_DASHBOARD_DATA_OLD
  );
  const [tableRows, setTableRows] = React.useState([]);
  const [noOfRows, setNoOfRows] = useState(10);
  const [page, setPage] = React.useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);
  const [isLoading, setLoading] = useState(false);

  /**
   * @description Handling form data
   *
   * @param {Object} event
   * @returns
   */
  const handleFormData = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    const {
      target: { name = "", value = "" },
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

      case "isBatch":
        setFormData({ ...formData, [name]: value });
        return;

      default:
        return { ...formData };
    }
  };

  /**
   * @description Handle From date
   *
   * @param {Object} event
   */
  const handleStartDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setFormData({ ...formData, startDate: date, endDate: null });
  };

  /**
   * @description Handle to date
   *
   * @param {Object} event
   */
  const handleEndDate = (
    date: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  /**
   * @description Handle search result for transaction table
   */
  const handleSearchResults = async () => {
    getTransactionReport({ page: page >= 1 ? page : 1, pageSize: 10 });
  };

  /**
   * @description  Get Transactions report
   */
  const getTransactionReport = async ({
    page = 1,
    pageSize = 10,
  }: {
    page: number | string;
    pageSize: number | string;
  }) => {
    if (isLoading) return;

    try {
      setLoading(true);

      const newFormattedParams = getFormattedParams(formData);

      let url = DASHBOARD_API.GET_TRANSACTION.replace(
        "#page_number#",
        String(!page ? 1 : page)
      ).replace("#page_size#", String(pageSize));

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

      const { data } = response || {};

      const {
        paymentInstructions = [],
        currPageNumber = 1,
        totalNumberOfRows = 20,
      } = data || {};

      const formattedPaymentInstructions = paymentInstructions.map(
        (data: object) => {
          const { date = "" } = (data as { date: string }) || {};

          return { ...data, date: getFormattedDateAndTime(date) };
        }
      );

      setTableRows(formattedPaymentInstructions);
      setNoOfRows(totalNumberOfRows);
      setPage(currPageNumber);

      // store data in redux store
      dispatch(setTransactionSummary(data));
      dispatch(setTransactionTableData(formattedPaymentInstructions));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description : Clearing form
   */
  const handleClearForm = () => {
    setFormData(DEFAULT_DASHBOARD_DATA_OLD);
    getFormattedParams(formData);
  };

  const {
    transactionRefNo,
    ourIbanNumber,
    otherBankCode,
    otherBankIban,
    direction,
    process,
    isBatch,
    startDate,
    endDate,
  } = formData || {};

  return (
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
        <Accordion sx={{ background: "#F5F6F9" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="icon" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              height: "68px",
              paddingTop: "2%",
            }}
          >
            <Title title={TITLES.FILTERS} />
          </AccordionSummary>
          <AccordionDetails>
            <form id="form">
              <StyledPaperInner sx={{ background: "#fff" }} elevation={3}>
                <Grid
                  container
                  className="dashboard-input-container"
                  spacing={2}
                >
                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <StyledTextField
                      label="Transaction Ref No"
                      value={transactionRefNo}
                      name="transactionRefNo"
                      onChange={handleFormData}
                    />
                  </Grid>
                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <StyledTextField
                      label="Our Bank IBAN"
                      value={ourIbanNumber}
                      name="ourIbanNumber"
                      onChange={handleFormData}
                    />
                  </Grid>
                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <StyledTextField
                      label="Other Bank Code"
                      value={otherBankCode}
                      name="otherBankCode"
                      onChange={handleFormData}
                    />
                  </Grid>

                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <StyledTextField
                      label="Other Bank IBAN"
                      value={otherBankIban}
                      name="otherBankIban"
                      onChange={handleFormData}
                    />
                  </Grid>
                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Direction
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={direction}
                        label="Direction"
                        onChange={handleFormData}
                        className="select-input"
                        name="direction"
                        data-testid="direction"
                      >
                        {DIRECTION_OPTIONS.map((options, index) => {
                          return (
                            <MenuItem
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

                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="process-select">Process</InputLabel>
                      <Select
                        labelId="process-select"
                        id="process-select"
                        value={process}
                        label="Age"
                        onChange={handleFormData}
                        className="select-input"
                        name="process"
                      >
                        {processOptions.map((options, index) => {
                          return (
                            <MenuItem
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

                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Is Batch
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isBatch}
                        label="Is Batch"
                        onChange={handleFormData}
                        className="select-input"
                        name="isBatch"
                      >
                        {isBatchOptions.map((options, index) => {
                          return (
                            <MenuItem
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

                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <CustomizedDatePicker
                          date={startDate}
                          onDateChange={handleStartDate}
                          format={"YYYY-MM-DD"}
                          label={"From"}
                          name={"from"}
                          isError={""}
                          minDate={startDate}
                          isDisabled={false}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid xs={6} item className="dashboard-input" md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <CustomizedDatePicker
                          date={endDate}
                          onDateChange={handleEndDate}
                          format={"YYYY-MM-DD"}
                          label={"To"}
                          name={"to"}
                          isError={""}
                          minDate={startDate}
                          isDisabled={!startDate}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                <ButtonGroup
                  onPrimaryBtnClick={handleSearchResults}
                  onSecondaryBtnClick={handleClearForm}
                  primaryButtonText={"Search"}
                  isClearButtonEnabled={true}
                  clearButtonText={"Clear"}
                />
              </StyledPaperInner>
            </form>
          </AccordionDetails>
        </Accordion>

        <Box style={searchResult}>
          <Title title={TITLES.DASHBOARD} />
          <StyledPaperInner>
            <StyledFlexBox>
              {Object.values(CARD_DUMMY_DATA).map(({ title, data }, index) => {
                return (
                  <DashboardCard
                    title={title}
                    data={data}
                    uniqueKey={`${title}-${index}`}
                    hasTable={false}
                    hasLineChart={false}
                    headers={[]}
                    rows={[]}
                    chartData={[]}
                  />
                );
              })}
            </StyledFlexBox>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <DashboardCard
                title={"TAT (in Seconds)"}
                hasLineChart={true}
                chartData={chartData}
                data={[]}
                uniqueKey={""}
                hasTable={false}
                headers={[]}
                rows={[]}
              />

              <DashboardTable
                columns={Object.values(DASHBOARD_TABLE_HEADERS)}
                rows={DASHBOARD_TABLE_ROWS}
                title={"TAT Breakdown (Average)"}
              />
            </Box>
          </StyledPaperInner>
        </Box>
      </StyledPaper>
    </div>
  );
}
