const path = require("path");

const config = {
  mode: "development",
  entry: {
    basket: path.resolve(__dirname, "src/components/basket"),
    image: path.resolve(__dirname, "src/components/image"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ui-components/[id].js",
    // library: ["uiComponents", "[id]"],
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
    ],
  },
};

module.exports = config;
