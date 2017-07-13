var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [{
    name: "production",
    entry: {
        common: "./src/common.js",
        index:"./src/index.js",
        app:"./src/app.js",
        auth:"./src/auth.js"
    },
    //devtool: "#inline-source-map",
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: "build/",
        filename: "[name].bundle.min.js",
        chunkFilename: "[name].chunk.min.js?ver=[chunkhash]"//给require.ensure用
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false
            },
            comments: false
        }),
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
            minify:{
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                keepClosingSlash: true,
                collapseWhitespace: true
            },
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
            minify:{
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                keepClosingSlash: true,
                collapseWhitespace: true
            },
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
        {test: /\.jpg$/, use: ["file-loader?name=images/[name].[ext]"]},
        {test: /\.png$/, use: ["url-loader?name=images/[name].[ext]&limit=8192"]},
        {
            test: /\.svg$/,
            loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
        },
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
                    presets: ['es2015','react']
                }
            }]

        }

    ]
}
}]