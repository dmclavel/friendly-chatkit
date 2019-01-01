const commonPaths = require('./common-paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
    entry: ["babel-polyfill", "../src/index.js"],
    output: {
        path: commonPaths.outputPath,
        chunkFilename: "static/[id].js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /(png|jpe?g|gif)$/,
                loaders: 'url-loader?limit=8000&name=assets/[name].[ext]'
            }
        ]
    },
    node: { //something with handling of fs module in web target
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new Dotenv(),   //to load process.env variables properly both during dev and prod
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        })
    ]
};
module.exports = config;