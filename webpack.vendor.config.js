var path = require('path');
var webpack = require("webpack");

module.exports = [{
    name: "vendor",
    entry: {
        common: "./src/common.js",
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "./build/",
        filename: "[name].bundle.min.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dll", "[name]-manifest.json"),
            name: "[name]",
            context: __dirname
        }),
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                //screw_ie8 : false
            },
            comments: false,
        })
    ],
    module: {
        rules: [{
            test: /\.json$/,
            use: [
                {
                    loader: "json-loader"
                }
            ]
        }, {
            test: /\.(png)$/,
            use: [
                {
                    loader: "url-loader?name=images/[name].[ext]&limit=8192"
                }
            ]
        }, {
            test: /\.(html)$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }
            ]
        }, {
            test: /\.js|jsx$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }]

        }]
    }
}]