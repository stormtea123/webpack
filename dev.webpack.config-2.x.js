module.exports = [{
    name: "develop",
    entry: "./src/entry.js",
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" }
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