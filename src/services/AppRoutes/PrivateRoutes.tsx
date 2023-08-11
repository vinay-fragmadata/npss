import React from "react";
import { Navigate } from "react-router-dom";
import LocalStorageService from "../../utils/Services/LocalStorageService";

export const PrivateRoutes = (props: any) => {
  const { Component } = props;

  // Get API token
  const isAuthenticatedLocalToken = LocalStorageService.getData("npssJwtToken");

  return isAuthenticatedLocalToken ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" />
  );
};
