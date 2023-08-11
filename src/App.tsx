import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Routes from "./services/AppRoutes/Routes";

export default function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes />
      </Router>
    </div>
  );
}
