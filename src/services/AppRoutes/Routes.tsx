import React, { Suspense, useEffect } from "react";
import {
  Routes as SwitchRoutes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";

import { APP_ROUTES } from "../../configs/routes";
import SimpleBackdropLoader from "../../components/Loader/SimpleBackdropLoader";
import LocalStorageService from "../../utils/Services/LocalStorageService";

// Lazy loading
const Login = React.lazy(() => import("../../pages/Login")) as any;
const Batch = React.lazy(() => import("../../pages/Batch")) as any;
// const Dashboard = React.lazy(() => import("../../pages/DashboardOld")) as any;
const Dashboard = React.lazy(() => import("../../pages/Dashboard")) as any;

const ForgotPassword = React.lazy(
  () => import("../../pages/ForgotPassword")
) as any;
const TransactionDetail = React.lazy(
  () => import("../../pages/TransactionDetail")
) as any;
const SearchTransaction = React.lazy(
  () => import("../../pages/SearchTransaction")
) as any;

const Routes = () => {
  const navigate = useNavigate();
  const npssJwtToken = LocalStorageService.getData("npssJwtToken");

  /**
   * @description: Preventing to go back on Login page if user is already logged in
   */
  useEffect(() => {
    const handleBackButton = () => {
      if (npssJwtToken && window.location.href.includes("login")) {
        navigate(APP_ROUTES.DEFAULT);
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [npssJwtToken]);

  return (
    <Suspense fallback={<SimpleBackdropLoader />}>
      <SwitchRoutes>
        {/* --Login Route-- */}
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route
          path={APP_ROUTES.LOGIN}
          element={<Navigate to={APP_ROUTES.LOGIN} />}
        />

        {/* --Forgot Password Route-- */}
        <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

        {/* --Dashboard Route-- */}
        {/* <Route path={"/"} element={<PrivateRoutes Component={Dashboard} />} /> */}
        <Route
          path={"/"}
          element={<PrivateRoutes Component={SearchTransaction} />}
        />

        {/* <Route
          path={APP_ROUTES.DASHBOARD}
          element={<PrivateRoutes Component={Dashboard} />}
        /> */}

        <Route
          path={APP_ROUTES.DASHBOARD}
          element={<PrivateRoutes Component={SearchTransaction} />}
        />

        {/* --Search Transaction Route-- */}
        <Route
          path={"/"}
          element={<PrivateRoutes Component={SearchTransaction} />}
        />

        <Route
          path={APP_ROUTES.SEARCH_TRANSACTION}
          element={<PrivateRoutes Component={SearchTransaction} />}
        />

        {/* --Transaction Detail Route-- */}
        <Route
          path={APP_ROUTES.TRANSACTION_DETAIL}
          element={<PrivateRoutes Component={TransactionDetail} />}
        />

        {/* --Batch File Search Route-- */}
        <Route
          path={APP_ROUTES.BATCH_FILE_SEARCH}
          element={<PrivateRoutes Component={Batch} />}
        />

        {/* --Batch Search Route-- */}
        <Route
          path={APP_ROUTES.BATCH_SEARCH}
          element={<PrivateRoutes Component={Batch} />}
        />
      </SwitchRoutes>
    </Suspense>
  );
};

export default Routes;
