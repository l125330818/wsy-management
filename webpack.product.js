
'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

module.exports = {
    devtool : false,
    entry: {
        index: './src/entry.js',
    },
    output: {
        path: __dirname + '/dist', //打包后的文件存放的地方
        filename: "[name].js", //打包后输出文件的文件名
    },
    externals: {
        "react": 'React',
        "react-dom": "ReactDOM",
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM":"react-dom",
            "$": "jquery",
        }),
        new webpack.OldWatchingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
        }),
    ]

}
