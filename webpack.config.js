const path = require("path");
const packageJson = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

class WebpackConfig {
  constructor({
    env = () => null,
    argv = () => null,
    entryPoints = [
      {
        name: "main",
        path: path.resolve(path.join(__dirname, "src/components")),
      },
    ],
  } = {}) {
    this.env = env;
    this.argv = argv;
    this.entryPoints = entryPoints;
    this.isDev = argv.mode === "development";
    this.baseConfig = {
      entry: this.getEntryPoints(),
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: (pathData) =>
          pathData.chunk.name === "main" ? "index.js" : "[name]/index.js",
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
      externals: this.getExternalDependancies(),
    };
  }
  getExternalDependancies() {
    const { peerDependencies, dependencies } = packageJson;
    return [
      ...Object.keys(peerDependencies || {}),
      ...Object.keys(dependencies || {}),
    ];
  }
  getEntryPoints() {
    const acc = {};
    this.entryPoints.map((entryPoint) => {
      acc[entryPoint.name] = entryPoint.path;
    });
    return acc;
  }
  prodConfig() {
    return { ...this.baseConfig, mode: "production" };
  }
  devConfig() {
    const acc = { ...this.baseConfig };
    acc.mode = "development";
    acc.devtool = "eval-source-map";
    return acc;
  }
  getConfig() {
    const config = this.isDev ? this.devConfig() : this.prodConfig();
    if (process.env.ANALYZE_STATS)
      config.plugins.push(new BundleAnalyzerPlugin());
    return config;
  }
}

const config = (env, argv) => {
  const componentPath = path.resolve(path.join(__dirname, "src/components"));
  const entryPointsArr = [
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
  const webpackConfig = new WebpackConfig({
    env,
    argv,
    entryPoints: entryPointsArr,
  });
  return webpackConfig.getConfig();
};

module.exports = config;
