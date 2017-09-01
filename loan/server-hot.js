var path = require('path');
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.dev.config");

var app = express();
var compiler = webpack(webpackConfig);
app.use(express.static('./build'));
app.use(webpackDevMiddleware(compiler, {
    proxy: {
        "/api": "http://localhost:3000"
    },
    stats: {
        colors: true
    },
    publicPath: webpackConfig.output.publicPath

}));
app.use(require("webpack-hot-middleware")(compiler,{
    //log: false,
    //path: "/__what",
    reload:true,
    heartbeat: 2000
}));
app.listen(3000, function () {
    console.log("Listening on port 3000!");
});