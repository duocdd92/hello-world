const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: 'Output Management',
    template: './index.html'
})

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['public'])

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'inline-source-map',
    plugins: [
        CleanWebpackPluginConfig,
        HtmlWebpackPluginConfig
    ],
    devServer: {
        contentBase: './public'
    }
};