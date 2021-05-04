const path = require("path");
const packageJson = require("./package.json");

const config = {
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

function getExternalDependancies() {
  const { peerDependencies, dependencies } = packageJson;
  return [
    ...Object.keys(peerDependencies || {}),
    ...Object.keys(dependencies || {}),
  ];
}

module.exports = config;
