var webpack = require('webpack');

module.exports = {
    entry: './tsx/main.tsx',
    output: {
        path: './public/build',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    
    // resolve: {
    //     extensions: ["",".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    // },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ],
        preLoaders: [
           { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}