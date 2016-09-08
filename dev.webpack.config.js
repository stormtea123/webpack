var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
module.exports = [{
    name: "develop",
    entry: {
        user: "./src/user.js"
        //goods:"./src/goods.js",
    },
    output: {
        path: __dirname,
        filename: "./build/[name].bundle.js"
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "./build/[name].bundle.css",
            allChunks: true
        })
    ],
    module: {
        //提取css
        loaders: [{
            test: /\.html$/,
            loader: "html"
        }, {
            test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!postcss-loader"
            })
        }, {
            test: /\.(png)$/,
            // inline base64 URLs for <=8k images, direct URLs for the rest
            loader: 'url-loader?name=./build/images/[name].[ext]'
        }, {test: /\.jpg$/, loader: "file-loader?name=./build/images/[name].[ext]"}]
    },
    postcss: function () {
        return [autoprefixer];
    }
}]