const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const preprocessOptions = {
  KOBITON_RESOURCE_LINKS_ENABLED: _toBoolean(process.env.KOBITON_RESOURCE_LINKS_ENABLED, true),
  KOBITON_MARKETING_ENABLED: _toBoolean(process.env.KOBITON_MARKETING_ENABLED, true),
  SUBSCRIPTION_UI_ENABLED: _toBoolean(process.env.SUBSCRIPTION_UI_ENABLED, true),
  SUBSCRIPTION_UI_FOR_ONPREMISE_ENABLED: _toBoolean(process.env.SUBSCRIPTION_UI_FOR_ONPREMISE_ENABLED, false),
  WOOTRIC_ENABLED: !!process.env.KOBITON_WOOTRIC_NPS_ID
}
function _toBoolean(source, defaultValue) {
  let val = defaultValue

  if (source) {
    val = source.toLowerCase() === 'true'
  }

  return val
}
module.exports = {
  output: {
    publicPath: 'http://localhost:8182/',
  },
  entry: "./src/index.js",
  devServer: {
    port: 8182,
    historyApiFallback: true,
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    modules: ['node_modules'],
    fallback: {'path': false, 'crypto': false},
    symlinks: false
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "increase",
      filename: "remoteEntry.js",
      remotes:{
        increase: 'increase@http://localhost:8182/remoteEntry.js'
      },
      exposes: {
        "./Increase": "./src/Increase.jsx",
        "./Main":"./src/Main.jsx"
      },
      shared: {
        // react: {
        //   singleton: true,
        //   requiredVersion: deps.react,
        // },
        // "react-dom": {
        //   singleton: true,
        //   requiredVersion: deps["react-dom"],
        // },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

  ],
};
