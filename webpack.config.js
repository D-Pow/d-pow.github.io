const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
ToDo
ServiceWorker in index.js (PUBLIC_URL injection)
favico & manifest
injecting PUBLIC_URL in front of static without changing the actual file output
Fix client.css code splitting to be smaller files
npm vulnerabilities
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PUBLIC_URL = process.env.NODE_ENV === 'production' ? 'website' : '';

const env = dotenv.config({
    path: './.env'
}).parsed;

const jsRegex = /\.jsx?$/;
const cssRegex = /\.css$/;
const sassRegex = /\.scss$/;
const assetRegex = /\.(png|gif|jpe?g|svg|ico)$/;

module.exports = {
    module: {
        rules: [
            {
                test: jsRegex,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: sassRegex,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: cssRegex,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: assetRegex,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `static/assets/[name]-[hash:8].[ext]`
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, env.NODE_PATH),
            'node_modules'
        ]
    },
    entry: {
        client: path.resolve(__dirname, 'src/index.js'),
        vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types']
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
        filename: `static/js/[name].[hash:8].bundle.js`,
        chunkFilename: `static/js/[name].[hash:8].chunk.js`
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist/'),
        port: 3000,
        // publicPath: 'http://localhost:3000/website',
        // hotOnly: true,
        historyApiFallback: true // For React Router
    },
    stats: { modules: false, children: false },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': env }),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            // favicon: './src/assets/favicon.ico',
            // minify: argv.mode === 'production' ? {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeRedundantAttributes: true,
            //     useShortDoctype: true,
            //     removeEmptyAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     keepClosingSlash: true,
            //     minifyJS: true,
            //     minifyCSS: true,
            //     minifyURLs: true,
            // } : false
        }),
        new InterpolateHtmlPlugin(process.env),
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash:8].css`,
            chunkFilename: `static/css/[name].[contenthash:8].chunk.css`
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            },
            chunks: 'all'
        },
        runtimeChunk: true
    }
};
