var webpack = require('webpack');
var path = require('path');
module.exports = [{
    name: "production",
    entry: {
        common: "./src/common.js",
        common2: "./src/common2.js",
        user: "./src/user.js",
        index:"./src/index.js",
        auth:"./src/auth.js",
        authBank:"./src/authBank.js",
        query:"./src/query.js"
    },
    //devtool: "#inline-source-map",
    output: {
        path: 'build/',
        publicPath: "build/",
        filename: "[name].bundle.min.js",
        chunkFilename: "[name].chunk.min.js?ver=[chunkhash]"//给require.ensure用
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                screw_ie8 : false
            },
            comments: false,
            mangle: {
                // Don't mangle $
                //except: ['$'],

                // Don't care about IE8
                screw_ie8 : false,
                //support_ie8: true

                // Don't mangle function names
                //keep_fnames: true
            },
            output: {
                screw_ie8 : false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json"
        },{
            test: /\.html$/,
            loader: "html"
        },{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.(png)$/,
            // inline base64 URLs for <=8k images, direct URLs for the rest
            loader: 'url-loader?name=images/[name].[ext]&limit=8192'
        }, {
            test: /\.jpg$/,
            loader: "file-loader?name=images/[name].[ext]&limit=8192"
        }]
    }
}]