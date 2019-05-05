const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPaths = {
    dev: '',
    prod: 'website'
};
const outputPath = process.env.NODE_ENV === 'production' ? outputPaths.prod : outputPaths.dev;

const env = dotenv.config({
    path: './.env'
}).parsed;

process.env = {
    ...process.env,
    ...env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: outputPath
};

const publicEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PATH: process.env.NODE_PATH,
    PUBLIC_URL: process.env.PUBLIC_URL
};

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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: cssRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    'css-loader'
                ]
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
            path.resolve(__dirname, process.env.NODE_PATH),
            'node_modules'
        ]
    },
    entry: {
        client: path.resolve(__dirname, 'src/index.js'),
        vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types']
    },
    output: {
        path: path.resolve(__dirname, outputPath), // set specific output path for github global user .io domain
        publicPath: outputPath,
        filename: `static/js/[name].[hash:8].bundle.js`,
        chunkFilename: `static/js/[name].[hash:8].chunk.js`
    },
    devServer: {
        // contentBase: path.join(__dirname, outputPaths.prod),
        port: 3000,
        // publicPath: `http://localhost:3000/${outputPaths.prod}`,
        // hotOnly: true,
        historyApiFallback: true // For React Router
    },
    stats: { modules: false, children: false }, // clean up npm output
    plugins: [
        // makes env available to src
        new webpack.DefinePlugin({ 'process.env': JSON.stringify(publicEnv) }),
        // injects tags like <script> into index.html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        // replaces %PUBLIC_URL% in index.html with env entry
        // new InterpolateHtmlPlugin(publicEnv),
        // splits CSS out from the rest of the code
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash:8].css`,
            chunkFilename: `static/css/[name].[contenthash:8].chunk.css`
        }),
        // manually copies files from src to dest
        new CopyWebpackPlugin([
            {
                from: 'src/manifest.json',
                to: '[name].[ext]'
            },
            {
                from: 'src/ServiceWorker.js',
                to: '[name].[ext]'
            },
            {
                from: 'src/assets/favicon.ico',
                to: 'static/assets/[name].[ext]'
            }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: { // split node_modules (as vendor) from src (as client)
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            },
            maxSize: 240000, // split very large output files into smaller chunks
            minSize: 100000, // prevent splitting of small files
            chunks: 'all' // removes repeated code from generated chunks
        },
        runtimeChunk: true
    },
    performance: {
        hints: false // disable "entrypoint size limit" warning
    }
};
