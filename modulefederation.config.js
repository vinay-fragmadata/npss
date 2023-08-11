const deps = require("./package.json").dependencies;

module.exports = {
  name: "persona",
  filename: "remoteEntry.js",
  exposes: {
    "./Dashboard": "./src/pages/dashboard",
    // "./SideNavMenu": "./src/components/SideNavNew",
    // "./Footer": "./src/components/Footer",
  },
  shared: {
    ...deps,
    react: { singleton: true, requiredVersion: deps["react"] },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  },
};
