const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let path = require("path");

module.exports = merge(common, {
    entry: {
        client: ['./src/index.js']
    },
    output: {
        filename: 'static/[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/"
    },

    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]

});