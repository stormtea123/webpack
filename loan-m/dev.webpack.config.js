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
        common: "./src/common.js",
        index:"./src/index.js",
        app:"./src/app.js",
        auth:"./src/auth.js"
    },
    //devtool: "#inline-source-map",
    output: {
        path: path.resolve(__dirname, 'dev'),
        //publicPath: "/loan",
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js?ver=[chunkhash]"//给require.ensure用
    },
    devtool:"source-map",
    devServer: {
        hot: false, // Tell the dev-server we're using HMR
        contentBase: path.resolve(__dirname, 'dev'),
        publicPath: '/',
        noInfo: false,
        port: 3000,
        //host: '192.168.16.67',
        host: '0.0.0.0',
        watchContentBase: true,
        disableHostCheck: true,
        proxy: {
            "/lts-plateform": {
                target: "http://192.168.16.44:14040/"
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/asset/index.html',
            favicon: './src/asset/favicon.ico',
            hash:true,
            excludeChunks: ['app','auth'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'index'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'app.html',
            template: './src/asset/app.html',
            favicon: './src/asset/favicon.ico',
            hash:true,
            excludeChunks: ['index','auth'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'app'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);

                return order1 - order2;
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'auth.html',
            template: './src/asset/auth.html',
            favicon: './src/asset/favicon.ico',
            hash:true,
            excludeChunks: ['index','app'],
            chunksSortMode:function (chunk1, chunk2) {
                var orders = ['common', 'auth'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);

                return order1 - order2;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ],
    module: {
        rules: [
            { // Disable webpack-dev-server's auto-reload feature in the browser.
                test: path.resolve(__dirname, 'node_modules/webpack-dev-server/client'),
                loader: 'null-loader'
            },
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
                test: /\.svg$/,
                loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader',{
                        loader:'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')({
                                        broswers: [
                                            "Android >= 4",
                                            "iOS >= 7"
                                        ]
                                    })
                                ];
                            }
                        }
                    }]
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
                        presets: ['es2015','react']
                    }
                }]

            }

        ]
    }
}