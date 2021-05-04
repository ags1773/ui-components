const path = require("path");
const packageJson = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cjsConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: path.join(__dirname, "src/components"),
  output: {
    filename: "cjs/index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
  externals: getExternalDependancies(),
};

const esmConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: {
    basket: path.join(__dirname, "src/components/basket/basket.m.css"),
    image: path.join(__dirname, "src/components/image/image.m.css"),
  },
  output: {
    filename: "esm/components/[name]/index.js",
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
    ],
  },
  externals: getExternalDependancies(),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "esm/components/[name]/[name].m.css",
    }),
  ],
};

function getExternalDependancies() {
  const { peerDependencies, dependencies } = packageJson;
  return [
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(dependencies || {}),
  ];
}

module.exports = [
  ...(process.env.BUILD_MODE === "cjs" ? [cjsConfig] : []),
  ...(process.env.BUILD_MODE === "esm" ? [esmConfig] : []),
];
