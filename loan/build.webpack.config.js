var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [{
    name: "production",
    entry: {
        common: "./src/common.js",
        user: "./src/user.js",
        admin:"./src/admin.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: "build/",
        filename: "[name].bundle.min.js",
        chunkFilename: "[name].chunk.min.js?ver=[chunkhash]"//给require.ensure用
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/asset/index.html',
            favicon: './src/asset/favicon.ico',
            minify:{
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                keepClosingSlash: true,
                collapseWhitespace: true
            },
            hash:true,
            excludeChunks: ['admin'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'user'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './src/asset/admin.html',
            favicon: './src/asset/favicon.ico',
            minify:{
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                keepClosingSlash: true,
                collapseWhitespace: true
            },
            hash:true,
            excludeChunks: ['user'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'admin'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);

                return order1 - order2;
            }
        }),
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
    rules: [
        {test: /\.jpg$/, use: ["file-loader?name=images/[name].[ext]"]},
        {test: /\.png$/, use: ["url-loader?name=images/[name].[ext]&limit=8192"]},
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }],
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: [{ loader: 'css-loader', options: { minimize: true }}]
            })
        },
        {
            test: /\.js|jsx$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }]

        }

    ]
}
}]