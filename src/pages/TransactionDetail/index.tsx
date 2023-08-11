import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "@emotion/styled";
import { Divider, Grid, Paper } from "@mui/material";

import FlexTables from "./FlexTables";

import Title from "../../components/Title";
import StyledTextBox from "../../components/StyledTextBox";
import AppHeader from "../../components/AppHeader";
import BackdropLoader from "../../components/Loader/BackdropLoader";
import CustomizedTables from "../../components/CustomizedTables";
import ShowNotification from "../../components/Notifications";
import { PrimaryButton } from "../../components/ButtonGroup/StyledComponents";
import ConfirmationBox from "../../components/ConfirmationBox";

import {
  PAC_MESSAGES_HEADER,
  FLEX_DETAILS_HEADERS,
  DEFAULT_NOTIFICATION,
  TITLES,
  BUTTON_TEXTS,
  USER_ROLES,
} from "../../configs";
import { APP_ROUTES } from "../../configs/routes";
import { TRANSACTION_DETAIL_API } from "../../configs/api";
import {
  CREDITOR_DETAILS,
  DEBITOR_DETAILS,
  DUMMY_REASONS,
  OVERVIEW_DETAILS,
  PAYMENT_ID_DETAILS,
} from "./configs";

import {
  setCreditorData,
  setDebitorData,
  setFlexDetails,
  setPaymentDetails,
} from "../../redux/transactionReport/actions";

import {
  StyleBoxPaper,
  StyledBoxCardContainer,
  StyledBoxFlex,
  StyledCard,
  StyledCardContent,
  StyledGridContainer,
  StyledPaper,
} from "./StyledComponents";

import { httpPost } from "../../utils/http";
import { getFormattedDateAndTime } from "../../utils/helper/getFormattedDateAndTime";
import { getCurrency } from "../../utils/helper/getCurrency";
import LocalStorageService from "../../utils/Services/LocalStorageService";

/**
 * @description -- Transaction Detail component --
 */
const TransactionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlPath = useLocation().pathname.split("/");
  const id: String = urlPath[urlPath.length - 1];
  const userRole = LocalStorageService.getData("user_role");

  const [isLoading, setLoading] = useState(false);
  const [returnRevData, setReturnRevData] = useState({
    canBeReturned: false,
    canReversalBeRequested: false,
  });

  const [overview, setOverview] = useState({ ...OVERVIEW_DETAILS });
  const [debitorDetails, setDebitorDetails] = useState({ ...DEBITOR_DETAILS });
  const [creditorDetails, setCreditorDetails] = useState({
    ...CREDITOR_DETAILS,
  });
  const [paymentIDs, setPaymentIDs] = useState({ ...PAYMENT_ID_DETAILS });
  const [pacsMessages, setPACsMessages] = useState([]);
  const [flexData, setFlexData] = useState([]);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATION);
  const [openReturn, setOpenReturn] = useState(false);
  const [openRev, setOpenRev] = useState(false);

  useEffect(() => {
    fetchTransactionDetails("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description Fetching Transaction details from id
   * @returns
   */
  const fetchTransactionDetails = async (newID: string | number) => {
    try {
      if (isLoading) return;
      setLoading(true);

      let url = TRANSACTION_DETAIL_API.GET_TRANSACTION_REPORT.replace(
        ":id",
        String(newID ? newID : id)
      );

      const response = await httpPost(url);

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
        pacsMessage = [],
        flexDetails = [],

        internalTransactionId,
        interBankSettlementAmount,
        currency,
        isReturn,
        isReversalRequested,
        overAllStatus,
        acceptanceDateTime,
        transactionReference,

        endToEndId,
        instrId,
        transactionId,
        uetr,
        clrsysref,

        debitorAccountNumber,
        debitorName,
        debitorIban,
        debitorBICFI,

        creditorAccountNumber,
        creditorName,
        creditorIban,
        creditorBICFI,

        returnPaymentId,
        reversalRequestId,

        canBeReturned,
        canReversalBeRequested,
      } = data || {};

      setReturnRevData({ canBeReturned, canReversalBeRequested });

      const formattedPACsMEssages = pacsMessage.map((data: any) => {
        const { messageDateTime } = data || {};
        return {
          ...data,
          messageDateTime: getFormattedDateAndTime(messageDateTime),
        };
      });

      // PACs messages
      setPACsMessages(formattedPACsMEssages);

      // TODO: uncomment when formatted date required
      // const formattedFlexDetails = flexDetails.map((data: any) => {
      //   const { endDateTime, startDateTime } = data || {};
      //   return {
      //     ...data,
      //     startDateTime: getFormattedDateAndTime(startDateTime),
      //     endDateTime: getFormattedDateAndTime(endDateTime),
      //   };
      // });

      setFlexData(flexDetails);

      // Storing to Reducers
      dispatch(setPaymentDetails(formattedPACsMEssages));
      dispatch(setFlexDetails(flexDetails));

      getOverviewData({
        internalTransactionId,
        transactionId,
        interBankSettlementAmount,
        isReturn,
        isReversalRequested,
        overAllStatus,
        acceptanceDateTime,
        transactionReference,
        currency,
        returnPaymentId,
        reversalRequestId,
      });

      getDebitorData({
        debitorAccountNumber,
        debitorName,
        debitorIban,
        debitorBICFI,
      });

      getCreditorData({
        creditorAccountNumber,
        creditorName,
        creditorIban,
        creditorBICFI,
      });

      getPaymentIdData({
        endToEndId,
        instrId,
        transactionId,
        uetr,
        clrsysref,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description  Sanitizing and formatting Overview Data
   * @param {Object} Arguments
   */
  const getOverviewData = ({ ...arg }) => {
    const formattedOverviewData = {
      ...OVERVIEW_DETAILS,
    };

    formattedOverviewData["transactionReference"].value =
      arg?.transactionReference ?? "";
    formattedOverviewData["internalTransactionId"].value =
      arg?.transactionId ?? "-";
    formattedOverviewData["interBankSettlementAmount"].value =
      getCurrency(arg?.currency, arg?.interBankSettlementAmount) ?? "";
    formattedOverviewData["isReturn"].value = arg?.isReturn ? "true" : "false";
    formattedOverviewData["isReversalRequested"].value =
      arg?.isReversalRequested ? "true" : "false";
    formattedOverviewData["acceptanceDateTime"].value =
      getFormattedDateAndTime(arg?.acceptanceDateTime) ?? "";
    formattedOverviewData["overAllStatus"].value = arg?.overAllStatus ?? "";

    // TODO: Add data from API
    // formattedOverviewData["returnPaymentId"].value = [2712, 2720];
    // formattedOverviewData["reversalRequestId"].value = [2725, 2730];

    formattedOverviewData["returnPaymentId"].value =
      arg?.returnPaymentId.length > 0 ? arg?.returnPaymentId : "-";

    formattedOverviewData["reversalRequestId"].value =
      arg?.reversalRequestId.length > 0 ? arg?.reversalRequestId : "-";

    // updating state
    setOverview(formattedOverviewData);

    // Storing to Reducers
  };

  /**
   * @description  Sanitizing and formatting Debitor Data
   * @param {Object} Arguments
   */
  const getDebitorData = ({ ...arg }) => {
    const formattedDebtorData = { ...DEBITOR_DETAILS };

    // formattedDebtorData["debitorAccountNumber"].value =
    //   arg?.debitorAccountNumber;
    formattedDebtorData["debitorName"].value = arg?.debitorName ?? "";
    formattedDebtorData["debitorIban"].value = arg?.debitorIban ?? "";
    formattedDebtorData["debitorBICFI"].value = arg?.debitorBICFI ?? "";

    // Storing values in state
    setDebitorDetails(formattedDebtorData);

    // storing values in Redux
    dispatch(setDebitorData(formattedDebtorData));
  };

  /**
   * @description  Sanitizing and formatting Creditor Data
   * @param {Object} Arguments
   */
  const getCreditorData = ({ ...arg }) => {
    const formattedCreditorData = { ...CREDITOR_DETAILS };

    // formattedCreditorData["creditorAccountNumber"].value =
    //   arg?.creditorAccountNumber;
    formattedCreditorData["creditorName"].value = arg?.creditorName ?? "";
    formattedCreditorData["creditorIban"].value = arg?.creditorIban ?? "";
    formattedCreditorData["creditorBICFI"].value = arg?.creditorBICFI ?? "";

    // Storing values in state
    setCreditorDetails(formattedCreditorData);

    // Storing values in redux
    dispatch(setCreditorData(formattedCreditorData));
  };

  /**
   * @description  Sanitizing and formatting Payment ID Data
   * @param {Object} Arguments
   */
  const getPaymentIdData = ({ ...arg }) => {
    const formattedPaymentID = { ...PAYMENT_ID_DETAILS };
    formattedPaymentID["endToEndId"].value = arg?.endToEndId ?? "";
    formattedPaymentID["instrId"].value = arg?.instrId ?? "";
    formattedPaymentID["transactionId"].value = arg?.transactionId ?? "";
    formattedPaymentID["uetr"].value = arg?.uetr ?? "";
    formattedPaymentID["clrsysref"].value = arg?.clrsysref ?? "";

    // Storing values in state
    setPaymentIDs(formattedPaymentID);

    // Storing values in store
    dispatch(setPaymentDetails(formattedPaymentID));
  };

  const handleRedirect = (id: string | number) => {
    fetchTransactionDetails(id);
    navigate(APP_ROUTES.TRANSACTION_DETAIL.replace(":id", String(id)));
  };

  /**
   * @description handle return/reversal
   * @returns  setting state for confirmation as per return/reversal
   */
  const handleReturnRev = () => {
    if (returnRevData.canBeReturned) return setOpenReturn(true);
    if (returnRevData.canReversalBeRequested) return setOpenRev(true);
  };

  /**
   * @description handle return/reversal button title
   * @returns  title for button as per return/reversal
   */
  const getReturnRev = () => {
    if (returnRevData.canBeReturned) return BUTTON_TEXTS.RETURN;
    if (returnRevData.canReversalBeRequested) return BUTTON_TEXTS.REV;
  };

  /**
   * @description handle closing confirmation box
   */
  const handleCloseConfirmation = () => {
    setOpenReturn(false);
    setOpenRev(false);
  };
  return (
    <div className="dashboard-paper">
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

      <ConfirmationBox
        isOpened={openReturn || openRev}
        confirmationType={getReturnRev()}
        onCloseConfirmation={handleCloseConfirmation}
        options={Object.values(DUMMY_REASONS)}
      />

      <AppHeader showBreadcrumbs={true} match={APP_ROUTES.TRANSACTION_DETAIL} />

      <StyledPaper elevation={2}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <Title title={TITLES.TRANSACTION_REPORT.label} />
          </Grid>

          {userRole == USER_ROLES.OPS.value &&
            (returnRevData.canBeReturned ||
              returnRevData.canReversalBeRequested) && (
              <ButtonGrid item xs={6} md={6}>
                <PrimaryButton
                  variant="contained"
                  className="primaryButton"
                  onClick={handleReturnRev}
                  data-testid="primary-btn-id"
                >
                  {getReturnRev()}
                </PrimaryButton>
              </ButtonGrid>
            )}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <StyledCard>
              <StyledCardContent className="styled-card-content">
                <Title
                  title={TITLES.TRANSACTION_REPORT.overview}
                  alignTextProp={"center"}
                  secondaryTitle={true}
                />

                <Divider />
                <StyledBoxCardContainer className="container--">
                  {Object.values(overview).map(({ value, label }, index) => {
                    if (!value) return;

                    if (Array.isArray(value)) {
                      return (
                        <StyledTextBox
                          uniqueKey={`${index}-${value}`}
                          key={`${index}-${value.toString()}`}
                          primaryText={label}
                          secondaryText={value.toString()}
                          isLessGap={false}
                          multiples={value}
                          onRedirect={handleRedirect}
                        />
                      );
                    }

                    return (
                      <StyledTextBox
                        uniqueKey={`${index}-${value}`}
                        key={`${index}-${value}`}
                        primaryText={label}
                        secondaryText={value}
                        isLessGap={false}
                        multiples={[]}
                        onRedirect={handleRedirect}
                      />
                    );
                  })}
                </StyledBoxCardContainer>
              </StyledCardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={6} md={6}>
            <StyledCard>
              <StyledCardContent>
                <Title
                  title={TITLES.TRANSACTION_REPORT.payment_id}
                  alignTextProp={"center"}
                  secondaryTitle={true}
                />

                <Divider />

                <StyledBoxCardContainer>
                  {Object.values(paymentIDs).map(({ value, label }, index) => {
                    if (!value) return;

                    return (
                      <StyledTextBox
                        uniqueKey={`${index}-${value}`}
                        primaryText={label}
                        secondaryText={value}
                        isLessGap={true}
                        multiples={[]}
                        onRedirect={handleRedirect}
                      />
                    );
                  })}
                </StyledBoxCardContainer>
              </StyledCardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={6} md={6}>
            <StyledCard>
              <StyledCardContent>
                <Title
                  title={TITLES.TRANSACTION_REPORT.debitor_details}
                  alignTextProp={"center"}
                  secondaryTitle={true}
                />
                <Divider />
                <StyledBoxCardContainer>
                  {Object.values(debitorDetails).map(
                    ({ value, label }, index) => {
                      if (!value) return;

                      return (
                        <StyledTextBox
                          uniqueKey={`${index}-${value}`}
                          primaryText={label}
                          secondaryText={value}
                          isLessGap={true}
                          multiples={[]}
                          onRedirect={handleRedirect}
                        />
                      );
                    }
                  )}
                </StyledBoxCardContainer>
              </StyledCardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={6} md={6}>
            <StyledCard>
              <StyledCardContent>
                <Title
                  title={TITLES.TRANSACTION_REPORT.creditor_details}
                  alignTextProp={"center"}
                  secondaryTitle={true}
                />
                <Divider />
                <StyledBoxCardContainer>
                  {Object.values(creditorDetails).map(
                    ({ value, label }, index) => {
                      if (!value) return;

                      return (
                        <StyledTextBox
                          uniqueKey={`${index}-${value}`}
                          primaryText={label}
                          secondaryText={value}
                          isLessGap={false}
                          multiples={[]}
                          onRedirect={handleRedirect}
                        />
                      );
                    }
                  )}
                </StyledBoxCardContainer>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <InnerStyling className="inner-styling">
          <StyledGridContainer container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title
                title={TITLES.FLEX_DETAILS.label}
                alignTextProp={"center"}
              />

              {/* <StyledBoxIPP className="ipp-ref-no">
                <StyledTypographyIPP>IIP Reference Number:</StyledTypographyIPP>
                <StyledTypographyIPPRef>3456334</StyledTypographyIPPRef>
              </StyledBoxIPP> */}

              <StyledBoxFlex className="inner-table">
                <FlexTables columns={FLEX_DETAILS_HEADERS} rows={flexData} />
              </StyledBoxFlex>
            </Grid>
          </StyledGridContainer>
        </InnerStyling>

        <InnerStyling className="inner-styling">
          <StyledGridContainer container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Title title={TITLES.PACS_MSG.label} alignTextProp={"center"} />

              <StyleBoxPaper elevation={2}>
                <CustomizedTables
                  columns={PAC_MESSAGES_HEADER}
                  rows={pacsMessages}
                />
              </StyleBoxPaper>
            </Grid>
          </StyledGridContainer>
        </InnerStyling>
      </StyledPaper>
    </div>
  );
};

export default TransactionDetail;

const ButtonGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "end",
  height: "10%",
}));

const InnerStyling = styled(Paper)(() => ({
  width: "100%",
  marginTop: "6%",
  backgroundColor: "#f5f6f9",
}));
