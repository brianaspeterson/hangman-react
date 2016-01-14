var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './scripts/hangman.js' // Your appʼs entry point
  ],
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader:  "babel",
                query:
                  {
                    presets:['es2015', 'react']
                  }
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }

             ]
    },
    devServer: {
        contentBase: "./public",
        noInfo: true, //  --no-info option
        hot: true,
        inline: true
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
};