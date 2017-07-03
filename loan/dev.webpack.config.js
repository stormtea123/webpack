var webpack = require('webpack');
var path = require('path');
var process = require('process');
process.traceDeprecation = true;

//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&noInfo=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    name: "develop",
    entry: {
        common: ["./src/common.js"],
        user: ["./src/user.js"],
        admin: ["./src/admin.js"],
    },
    //devtool: "#inline-source-map",
    output: {
        path: path.resolve(__dirname, 'dev'),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js?ver=[chunkhash]"//给require.ensure用
    },
    devtool:"source-map",
    devServer: {
        hot: false, // Tell the dev-server we're using HMR
        contentBase: path.resolve(__dirname, 'dev'),
        publicPath: '/',
        noInfo: false,
        port: 3002,
        watchContentBase: true,
        proxy: {
            "/lts-plateform": {
                target: "http://192.168.16.41:30001/"
            }
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/asset/index.html',
            favicon: './src/asset/favicon.ico',
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
            hash:true,
            excludeChunks: ['user'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'admin'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);

                return order1 - order2;
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.json$/,
                use: 'json-loader'
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
}