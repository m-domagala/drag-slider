const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
 mode: 'production',
 entry: './src/main.js',
 output: {
  path: path.resolve(__dirname, 'build'),
  filename: 'bundle.js',
 },
 module: {
  rules: [
   {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
     MiniCssExtractPlugin.loader,
     'css-loader',
     {
      loader: 'postcss-loader',
      options: {
       postcssOptions: {
        plugins: [['postcss-preset-env', { autoprefixer: { grid: true } }]],
       },
      },
     },
     'sass-loader',
    ],
   },
   {
    test: /\.(png|jpe?g|svg|gif|)$/i,
    loader: 'file-loader',
    options: {
     name: '[name].[ext]',
     outputPath: 'images',
    },
   },
   {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-env'],
     },
    },
   },
  ],
 },
 plugins: [
  new CopyPlugin({
   patterns: [
    {
     from: 'src/images',
     to: 'images',
    },
   ],
  }),
  new HtmlWebpackPlugin({
   template: 'src/main.html',
   filename: 'index.html',
  }),
  new MiniCssExtractPlugin({
   filename: 'bundle.css',
  }),
 ],
};
