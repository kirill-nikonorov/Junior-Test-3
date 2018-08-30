const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require('webpack');
let path = require("path");

module.exports = merge(common, {
    entry: {
        client: ['webpack-hot-middleware/client', './src/index.js']
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/static/"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: './public',
        disableHostCheck: true,
        hot: true
    },
    devtool: "source-map",
});