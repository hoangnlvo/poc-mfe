const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: 'http://localhost:8184/',
    libraryTarget: 'umd',
    globalObject: 'self'
  },
  entry: {app:["./src/index.js"]},
  devServer: {
    port: 8184,
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
optimization: {
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "decrease",
      filename: "remoteEntry.js",
      remotes:{
        a: 'a@http://localhost:8082/remoteEntry.js'
      },
      exposes: {
        "./Decrease": "./src/Decrease.jsx",
      },
      shared: {
        ...deps,
        "react-dom": {
          import: "react-dom", // the "react" package will be used a provided and fallback module
          shareKey: "react-dom", // under this name the shared module will be placed in the share scope
          shareScope: "legacy", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
          requiredVersion: deps['react-dom'],
        },
        // oldReact: {
        //   import: "react", // the "react" package will be used a provided and fallback module
        //   shareKey: "oldReact", // under this name the shared module will be placed in the share scope
        //   shareScope: "legacy", // share scope with this name will be used
        //   singleton: true, // only a single version of the shared module is allowed
        // }
      },
    }),
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

  ],
};
