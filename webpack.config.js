const path = require("path");

const config = {
  mode: "development",
  entry: () => getEntryPoints(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[id].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
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
      name: "index",
      path: `${componentPath}`,
    },
  ];

  const acc = {};
  bundlesArr.map((bundle) => {
    acc[bundle.name] = bundle.path;
  });
  return new Promise((resolve) => resolve(acc));
}
