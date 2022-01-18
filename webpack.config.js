const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, 'dist'),
  
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
       {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
       {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // "style-loader",
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
        {
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
  },
       
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Webpack Basics",
      template: "src/todo.html"
    }),
    new MiniCssExtractPlugin({

      },
    ),
     new SourceMapDevToolPlugin({
  }),
  ],

  // devServer: {
  //   open: "true",
  // }
};