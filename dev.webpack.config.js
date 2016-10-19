var webpack = require('webpack');
var path = require('path');
module.exports = [{
    name: "develop",
    entry: {
        common: "./src/common.js",
        common2: "./src/common2.js",
        user: "./src/user.js",
        index:"./src/index.js",
        auth:"./src/auth.js"
    },
    output: {
        path: 'build/',
        publicPath: "build/",
        filename: "[name].bundle.js"
    },
    module: {
        //提取css
        loaders: [{
            test: /\.html$/,
            loader: "html"
        },{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(png)$/,
            // inline base64 URLs for <=8k images, direct URLs for the rest
            loader: 'url-loader?name=images/[name].[ext]'
        }, {test: /\.jpg$/, loader: "file-loader?name=images/[name].[ext]"}]
    }
}]