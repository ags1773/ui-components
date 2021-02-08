const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: () => getEntryPoints(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      return pathData.chunk.name === "main" ? "index.js" : "[name]/index.js";
    },
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
        ],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        return pathData.chunk.name === "main"
          ? "styles.css"
          : "[name]/styles.css";
      },
    }),
  ],
};

module.exports = config;

function getEntryPoints() {
  const componentPath = path.resolve(path.join(__dirname, "src/components"));
  const bundlesArr = [
    // This contains all components to be exported as separate bundles
    {
      name: "basket",
      path: `${componentPath}/basket`,
    },
    {
      name: "image",
      path: `${componentPath}/image`,
    },
    {
      name: "main",
      path: `${componentPath}`,
    },
  ];

  const acc = {};
  bundlesArr.map((bundle) => {
    acc[bundle.name] = bundle.path;
  });
  return new Promise((resolve) => resolve(acc));
}
