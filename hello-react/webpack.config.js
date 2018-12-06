const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: {
        index: './src/index.jsx',
    },
    output: {
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
            test: /\.jsx$/,
            use: [{
                loader: "babel-loader"
            }]
        }
        ]
    }
}