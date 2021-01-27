const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web', 
  entry: './src/client/index.tsx', 
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js'
  },
  devServer: {
    port: 3000,
    contentBase: 'dist', 
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.json",
            },
          },
        ]
      }
    ]
  }
};