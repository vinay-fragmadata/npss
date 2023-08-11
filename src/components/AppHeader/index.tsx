import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bool, string } from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  styled,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Breadcrumbs from "../Breadcrumbs";
import SideBarMenu from "../SideBarMenu";

import { APP_ROUTES } from "../../configs/routes";
import { LOGOS } from "../../configs/imageContainer";

import { clearStorages } from "../../utils/helper/getClearStorages";

import { setResetSearchTransaction } from "../../redux/searchTransaction/searchTransaction.actions";
import { setResetTransactionReport } from "../../redux/transactionReport/actions";
import { setResetDashboard } from "../../redux/dashboard/dashboard.actions";
import { setResetBatch } from "../../redux/batch/actions";

import "./style.css";

export default function AppHeader({
  showBreadcrumbs,
  match,
}: {
  showBreadcrumbs: boolean;
  match: any;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSideBarOpen, setOpenSideBar] = useState(false);

  /**
   * @description Open Sidebar menu
   */
  const handleSideBar = () => {
    setOpenSideBar(!isSideBarOpen);
  };

  /**
   * @description Close Sidebar menu
   */
  const handleCloseSideBar = () => {
    setOpenSideBar(false);
  };

  /**
   * @description Logging out
   */
  const handleLogout = () => {
    try {
      clearStorages();
      dispatch(setResetSearchTransaction());
      dispatch(setResetTransactionReport());
      dispatch(setResetDashboard());
      dispatch(setResetBatch());

      navigate(APP_ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <StyledBox>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <StyledTypography>Menu</StyledTypography>
          </StyledBox>

          <img src={LOGOS.mashreqLogo.image} alt={LOGOS.mashreqLogo.alt} />

          <StyledButton
            data-testid="login-button"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </StyledButton>
        </StyledToolbar>
      </AppBar>

      {showBreadcrumbs && (
        <StyledBreadcrumbBox>
          <Breadcrumbs match={match} />
        </StyledBreadcrumbBox>
      )}

      {isSideBarOpen && (
        <SideBarMenu
          isSideBarOpen={isSideBarOpen}
          onCloseSideBar={handleCloseSideBar}
        />
      )}
    </Box>
  );
}

/**
 * Prop types
 */
AppHeader.propTypes = {
  showBreadcrumbs: bool.isRequired,
  match: string,
};

/**
 * Default Prop
 */
AppHeader.defaultProps = {
  showBreadcrumbs: false,
  match: "",
};

/**
 * Custom Styling
 */
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "500",
  height: "20px",
  letterSpacing: "0px",
  width: "36px",
  fontFamily: "Gilroy-medium",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "72px",
  background: "#1a4198",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "500",
  height: "30px",
  letterSpacing: "0px",
  width: "36px",
  fontFamily: "Gilroy-medium",
}));

const StyledBreadcrumbBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 3),
}));
