let path = require("path");


module.exports = {
    entry: {
        client: ['./src/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: "/public"
    },

    module: {
        rules: [{
            exclude: /(node_modules)/,
            test: /\.jsx?$/,
            loaders: "babel-loader",
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: "source-map",
};