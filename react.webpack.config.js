var webpack = require("webpack");
module.exports = [{
    name: "develop",
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "/build/bundle.js"
    },
    module: {
        loaders: [
            //{ test: /\.css$/, exclude: /node_modules/,loader: "style!css" },
            //{ test: /\.js|jsx$/, exclude: /node_modules/, loaders: ['babel'] }

            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }

        ]
    }
}, {
    name: "build",
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "/build/bundle.min.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }

        ]
    }
}]