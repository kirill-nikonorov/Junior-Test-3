
module.exports = {
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
};