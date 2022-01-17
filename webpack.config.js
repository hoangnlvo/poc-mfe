const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  mode: 'development',

  output: {
    publicPath: 'http://localhost:8182/'
  },

  devtool: 'source-map',

  devServer: {
    port: 8182,
    historyApiFallback: true
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
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      remotes: {
        remoteApp: "remoteApp@http://localhost:8182/remoteEntry.js",
        portal:"portal@https://localhost:8181/remoteEntry.js"
      },
      exposes: {
        "./Item": "./src/Item.js",
        "./Main": "./src/Main.js",
        "./Header": "./src/test-management/top-bar/header.jsx",
        "./MenuItem": "./src/test-management/top-bar/menu-item.jsx",
        "./App": "./src/App.js",
        "./TopBar":"./src/test-management/top-bar/index.jsx",
        './newReact': require.resolve('react'),
        './newReactDOM': require.resolve('react-dom'),
      },
      shared: {
        'react-dom': 'react-dom',
        [`styled-components-${require('styled-components').VERSION}`]: 'styled-components',
          react: {
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'newReact', // under this name the shared module will be placed in the share scope
            shareScope: 'default', // share scope with this name will be used
            singleton: true, // only a single version of the shared module is allowed
            requiredVersion: deps.react
          },
          // reactNew: {
          //   import: "react", // the "react" package will be used a provided and fallback module
          //   shareKey: "reactNew", // under this name the shared module will be placed in the share scope
          //   shareScope: "modern", // share scope with this name will be used
          //   singleton: true, // only a single version of the shared module is allowed
          // },

      }
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
}