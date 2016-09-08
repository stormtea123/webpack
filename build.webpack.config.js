var webpack = require('webpack');
var path = require('path');
module.exports = [{
    name: "production",
    entry: {
        user: "./src/user.js",
        welcome:"./src/welcome.js"
    },
    output: {
        path: __dirname,
        filename: "./build/[name].bundle.min.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
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
        }, {
            test: /\.jpg$/,
            loader: "file-loader?name=images/[name].[ext]"
        }]
    }
}]