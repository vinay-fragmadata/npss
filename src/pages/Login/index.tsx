import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  styled,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LOGIN_API, bs } from "../../configs/api";
import { APP_ROUTES } from "../../configs/routes";
import { AUTH_MSG } from "../../configs/messages";
import { IMAGES, LOGOS } from "../../configs/imageContainer";
import { textFieldStyling } from "../../configs/style";

import { StyledLoginButton } from "../../styledComponents/StyledButtons";
import {
  StyledPrimaryTypography,
  StyledSecondaryTypography,
} from "../../styledComponents/StyledTypography";
import { StyledHeaderBox } from "../../styledComponents/StyledSimpleHeader";
import { StyledTextField } from "../DashboardOld/StyledComponents";

import BackdropLoader from "../../components/Loader/BackdropLoader";
import ShowNotification from "../../components/Notifications";

import { httpPost } from "../../utils/http";
import LocalStorageService from "../../utils/Services/LocalStorageService";
import CookieStorageService from "../../utils/Services/CookieStorageService";
import {
  getValidatedName,
  getValidatedPassword,
} from "../../utils/helper/getValidations";

import "./style.scss";

/**
 * @description Interfaces
 */
interface HandelChangeInterface {
  value: string;
  name: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loginFormData, setLoginFormData] = React.useState({
    username: "",
    password: "",
  });
  const [loader, setLoading] = React.useState(false);
  const [isSubmit, setSubmit] = React.useState(false);
  const [notifications, setNotifications] = React.useState({});
  const [openNotification, setOpenNotification] = React.useState(false);

  /**
   * @description Handle username and password
   * @param {Object} {value, name}
   */
  const handleChange = ({ target }: { target: any }) => {
    const { value, name } = target as HandelChangeInterface;

    if (name === "userName")
      setLoginFormData({ ...loginFormData, username: value });

    if (name === "password")
      setLoginFormData({ ...loginFormData, password: value });
  };

  /**
   * @description Event to show password
   * @returns updating state
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /**
   * @description Entering Password event
   * @param event
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) => {
    event.preventDefault();
  };

  /**
   * @description Redirecting To forgot password page
   */
  const gotToForgotPassword = () => {
    navigate(APP_ROUTES.FORGOT_PASSWORD);
  };

  /**
   * @description Handle Login process
   */
  const handleLogin = async () => {
    try {
      if (loader || !loginFormData.username || !loginFormData.password)
        return true;

      setLoading(true);
      setSubmit(true);

      const url = LOGIN_API.LOGIN;
      const header = {};

      const data = await httpPost(url, loginFormData, header);

      // in case of error
      if (!data || data?.isError) {
        setOpenNotification(true);

        setNotifications({
          ...notifications,
          isError: true,
          statusCode: data?.statusCode || 0,
          msgType: "failed",
          failedMsgTitle:
            (data?.statusCode == "401" && AUTH_MSG.authentication_failed) ||
            (data?.statusCode == "403" && AUTH_MSG.authorization_failed) ||
            AUTH_MSG.something_went_wrong,
          msg:
            (data?.statusCode == "401" && AUTH_MSG.access_denied) ||
            (data?.statusCode == "403" && AUTH_MSG.wrong_credential) ||
            AUTH_MSG.something_went_wrong,
          isFailedButtonShow: true,
        });
      }

      // in case of successful response
      if (data && !data?.isError) {
        setOpenNotification(true);

        LocalStorageService.setData("npssJwtToken", data?.data?.token);
        LocalStorageService.setData("username", data?.data?.username);
        LocalStorageService.setData("user_role", data?.data?.role);

        CookieStorageService.setCookie("username", data?.data?.username);
        CookieStorageService.setCookie("user_role", data?.data?.role);

        CookieStorageService.setCookie(
          "npssJwtToken",
          data?.data?.token,
          data?.data?.validity
        );

        navigate(APP_ROUTES.DASHBOARD);

        // Uncomment success notification when to show success
        // Set Success message
        // setNotifications({
        //   ...notifications,
        //   isError: false,
        //   statusCode: data?.statusCode || data?.status,
        //   msgType: "success",
        //   msg: SUCCESS_MESSAGES.login_success,
        //   isFailedButtonShow: false,
        // });
      }
      setLoading(false);
    } catch (error) {
      console.error("handle login error----", error);
      setLoading(false);
    }
  };

  /**
   * @description Handle Open/Close Notification
   */
  const handleOpenNotification = () => {
    setOpenNotification(false);
  };

  return (
    <StyledPaper className="login-page-container">
      {loader && <BackdropLoader />}

      {!loader && isSubmit && notifications?.isError && (
        <ShowNotification
          failedMsgTitle={notifications?.failedMsgTitle || ""}
          msg={notifications?.msg}
          isError={notifications?.isError}
          msgType={notifications?.msgType}
          statusCode={notifications?.statusCode}
          openNotification={openNotification}
          onOpenNotification={handleOpenNotification}
          onRedirect={undefined}
        />
      )}

      <StyledHeaderBox>
        <img
          className="login-page-logo"
          src={LOGOS.mashreqLogo.image}
          alt={LOGOS.mashreqLogo.alt}
        />
      </StyledHeaderBox>

      <StyledLoginBox>
        <Box className="login-form-box">
          <StyledLoginContainer className="login-form-container">
            <StyledPrimaryTypography>NPSS</StyledPrimaryTypography>

            <StyledSecondaryTypography>
              Log in to your account
            </StyledSecondaryTypography>

            <FormControl
              className="login-form-control"
              sx={{ m: 2 }}
              variant="outlined"
            >
              <StyledTextField
                id="outlined-error-helper-text"
                data-testid="user-name"
                label="User Name"
                placeholder="User Name"
                defaultValue=""
                name="userName"
                value={loginFormData.username}
                onChange={handleChange}
                error={
                  isSubmit && Boolean(getValidatedName(loginFormData.username))
                }
                sx={textFieldStyling}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />

              {isSubmit && (
                <FormHelperText error id="accountId-error">
                  {getValidatedName(loginFormData.username)}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              className="login-form-control"
              sx={{ m: 2 }}
              variant="outlined"
            >
              <StyledTextField
                id="outlined-adornment-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={loginFormData.password}
                type={showPassword ? "text" : "password"}
                label="Password"
                error={
                  isSubmit &&
                  Boolean(getValidatedPassword(loginFormData.password))
                }
                sx={textFieldStyling}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {isSubmit && (
                <FormHelperText error id="accountId-error">
                  {getValidatedPassword(loginFormData.password)}
                </FormHelperText>
              )}

              {/* <StyledForgotPasswordTypography onClick={gotToForgotPassword}>
                Forgot Password?
              </StyledForgotPasswordTypography> */}

              <StyledLoginButton
                data-testid="login-btn"
                variant="contained"
                disabled={!loginFormData.password || !loginFormData.password}
                onClick={handleLogin}
                className="login-button"
              >
                Log in
              </StyledLoginButton>
            </FormControl>
          </StyledLoginContainer>
        </Box>

        <Box className="login-form-box">
          <img
            className="mashreq-image"
            src={IMAGES.MASHREQ_IMAGE.image}
            alt={IMAGES.MASHREQ_IMAGE.alt}
          />
        </Box>
      </StyledLoginBox>
    </StyledPaper>
  );
};

export default Login;

/**
 * Custom styling
 */
const StyledPaper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
}));

const StyledLoginBox = styled(Box)(({ theme }) => ({
  width: "64%",
  height: "75%",
  background: "#fff",
  margin: "2.5% auto",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledLoginContainer = styled(Box)(({ theme }) => ({
  padding: "10% 10% 10% 6%",
}));
