module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  ignore: ["node_modules/", "build"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "dynamic-import-node",
  ],
  env: {
    test: {
      presets: [
        ["@babel/preset-env"],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        "dynamic-import-node",
      ],
    },
  },
};
