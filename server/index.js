const path = require("path");
const webpack = require("webpack");
const devConfig = require("../webpack.dev");
const compiler = webpack(devConfig);

let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");

const express = require("express");
const app = express();
const http = require("http").Server(app);

app.use(express.static('public'));

app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname , "../public/index.html"));
});


let port = 3001;

http.listen(port, function () {
    setTimeout(() => console.log("Example app listening on port " + port + "!"), 1000);
});

