const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
  return {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
      main: "./index.js",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue$: "vue/dist/vue.runtime.esm.js",
      },
    },
    target: "web",
    devServer: {
      port: 4000,
    },
    plugins: [
      new VueLoaderPlugin(),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/favicon.ico"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }),
    ].concat(
      options.mode === "development"
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: "css/[name].[contenthash].css",
              chunkFilename: "css/[id].[contenthash].css",
            }),
          ]
    ),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            options.mode === "development"
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {},
                },
            "css-loader",
          ],
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[hash][ext]",
          },
        },
        {
          test: /\.ttf$/,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[hash][ext]",
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: "runtime",
      },
    },
  };
};
