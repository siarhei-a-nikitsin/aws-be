const { IgnorePlugin } = require('webpack');

module.exports = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new IgnorePlugin({
        resourceRegExp: /^pg-native$/,
    }),
  ]
};
