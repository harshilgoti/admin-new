const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: { main: "./src/index.js" },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
      path.resolve(__dirname, "node_modules/mini-css-extract-plugin"),
      path.resolve(__dirname, "node_modules/typeface-muli")
    ]
  },
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "./build/"),
    publicPath: "/"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        exclude: ["/node_modules/"],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true
                  }
                }
              ],
              "@babel/react"
            ],
            plugins: [
              "@babel/proposal-object-rest-spread",
              // "@babel/plugin-transform-runtime"
              "@babel/proposal-class-properties",
              "@babel/syntax-dynamic-import",
              "preval"
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|eot|ttf|dtd)$/,
        loader: "file-loader",
        exclude: [
          "/node_modules/",
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        ],

        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts"
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        loader: "file-loader",

        exclude: [
          "/src/assets/icons/favicon.ico",
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        ],
        options: {
          name: "[name].[ext]",
          outputPath: "static/images"
        }
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        use: [
          {
            loader: "style-loader"
            // options: {
            //   singleton: true
            // }
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
              },
              minify: true
            })
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 10000,
      automaticNameDelimiter: "_"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Ztc",
      template: "public/index.html",
      description: "Ztc admin",
      filename: "index.html",
      favicon: "./public/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[hash].css"
    }),
    new CopyPlugin([{ from: "public", to: ".", toType: "dir", exclude: ["index.html"] }]),
    new CleanWebpackPlugin(),
    new Dotenv({ path: "./.env.development", defaults: false })
  ],
  stats: {
    env: true,
    colors: true,
    moduleTrace: true,
    errorDetails: true
  },
  devServer: {
    host: "localhost",
    https: false,
    port: 8000,
    hot: true,
    contentBase: "./build",
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
};
