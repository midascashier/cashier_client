module.exports = {
    entry: './js/main.jsx',

    output: {
        filename: './js/index.js'
    },

    devServer: {
        inline: true,
        port: 7777
    },

    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react']
            }
        }]
    }

};