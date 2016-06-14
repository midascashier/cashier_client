module.exports = {
  entry: './js/main.jsx',

  output: {
    filename: './build/bundle.js'
  },

  devServer: {
    inline: true,
    port: 7777
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',

      query: {
        presets: ['es2015', 'react']
      }
    }]
  }

};