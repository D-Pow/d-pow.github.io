const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildOutputPaths = {
    dev: '',
    prod: 'website'
};
const buildOutputPath = process.env.NODE_ENV === 'production' ? buildOutputPaths.prod : buildOutputPaths.dev;
const publicUrl = 'static';
const title = 'Devon Powell';

const env = dotenv.config({
    path: './.env'
}).parsed;

process.env = {
    ...process.env,
    ...env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: publicUrl
};

const publicEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PATH: process.env.NODE_PATH,
    PUBLIC_URL: process.env.PUBLIC_URL
};

const jsRegex = /\.jsx?$/;
const cssRegex = /\.css$/;
const sassRegex = /\.scss$/;
const assetRegex = /\.(png|gif|jpe?g|svg|ico|pdf|tex)$/;

const hotReloading = false; // process.env.NODE_ENV === 'development';

module.exports = {
    module: {
        rules: [
            {
                test: jsRegex,
                exclude: /node_modules/,
                include: /src/,
                use: 'babel-loader'
            },
            {
                test: sassRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: hotReloading,
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => require('postcss-preset-env')
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: cssRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: hotReloading,
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => require('postcss-preset-env')
                        }
                    }
                ]
            },
            {
                test: assetRegex,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: `${publicUrl}/assets/[name]-[hash:8].[ext]`
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
        client: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types']
    },
    output: {
        path: path.resolve(__dirname, buildOutputPath), // output path for webpack build on machine, not relative paths for index.html
        filename: `${publicUrl}/js/[name].[hash:8].bundle.js`,
        chunkFilename: `${publicUrl}/js/[name].[hash:8].chunk.js`
    },
    devServer: {
        port: 3000,
        stats: 'minimal',  // silence superfluous webpack-dev-server "emitted" output
        open: true, // open browser window upon build
        hot: hotReloading, // for `module.hot` hot-reloading block in index.js
        historyApiFallback: true // For React Router
    },
    stats: { modules: false, children: false }, // clean up npm output
    plugins: [
        // makes env available to src
        new webpack.DefinePlugin({ 'process.env': JSON.stringify(publicEnv) }),
        // injects tags like <script> into index.html
        new HtmlWebpackPlugin({
            title,
            template: './src/index.html',
            meta: {
                'theme-color': '#3800FF'
            }
        }),
        // replaces %PUBLIC_URL% in index.html with env entry
        new InterpolateHtmlPlugin(publicEnv),
        // splits CSS out from the rest of the code
        new MiniCssExtractPlugin({
            filename: `${publicUrl}/css/[name].[contenthash:8].css`,
            chunkFilename: `${publicUrl}/css/[name].[contenthash:8].chunk.css`
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
                from: 'src/assets/favicon*',
                to: '[name].[ext]'
            }
        ])
    ],
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin() ],
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
        }
    },
    performance: {
        hints: false // disable "entrypoint size limit" warning
    }
};
