const path = require('path');

module.exports = {
  mode: 'development',
  entry: './application/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /coverage/],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    open: true,
    port: 9000,
  },
};
