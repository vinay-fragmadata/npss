import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { HashRouter as Router } from "react-router-dom";

import { appTheme } from "./configs/theme";
import Routes from "./services/AppRoutes/Routes";

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Router basename="/">
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
}
