const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const relativeBuildOutputPaths = {
    dev: '',
    prod: 'website'
};
const relativeBuildOutputPath = process.env.NODE_ENV === 'production' ? relativeBuildOutputPaths.prod : relativeBuildOutputPaths.dev;
const absoluteBuildOutputPath = path.resolve(__dirname, relativeBuildOutputPath);
const transpiledSrcOutputPath = 'static';
const title = 'Devon Powell';

const env = dotenv.config({
    path: './.env'
}).parsed;

process.env = {
    ...process.env,
    ...env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: transpiledSrcOutputPath
};

const publicEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PATH: process.env.NODE_PATH,
    PUBLIC_URL: process.env.PUBLIC_URL
};

const jsRegex = /\.jsx?$/;
const scssRegex = /\.s?css$/;
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
                test: scssRegex,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: hotReloading,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
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
                test: assetRegex,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: absolutePathToAsset => {
                                const assetName = absolutePathToAsset.slice(absolutePathToAsset.lastIndexOf('/') + 1);

                                if (assetName.includes('favicon')) {
                                    /**
                                     * `[path]` == relative path from src folder,
                                     * e.g. `src/assets/my-image.png` or `src/assets/images/my-image.png`.
                                     *
                                     * Don't append `[path]` for favicon files since they
                                     * need to be in the output root directory, `website/`.
                                     *
                                     * This, mixed with the removal of `static/` in the
                                     * `outputPath` function results in outputting favicon
                                     * files in output root directory, `website/`.
                                     */
                                    return `[name].[ext]`;
                                }

                                return '[path][name]-[hash:8].[ext]';
                            },
                            outputPath: outputFromNameFunction => {
                                /**
                                 * Samples:
                                 * '[path][name]-[hash:8].[ext]'   ->   `src/assets/MyImage-991ec5ea.png`
                                 * '[name].[ext]'   ->   `MyImage.png`
                                 */
                                const indexForPathRelativeToSrc = outputFromNameFunction.indexOf('/') + 1;
                                const pathRelativeToSrc = outputFromNameFunction.slice(indexForPathRelativeToSrc);

                                if (pathRelativeToSrc.includes('favicon')) {
                                    // Don't add `static/` to favicon images.
                                    // Results in outputting them to output root directory, `website/`.
                                    return pathRelativeToSrc;
                                }

                                return `${transpiledSrcOutputPath}/${pathRelativeToSrc}`;
                            }
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
        client: ['core-js', 'isomorphic-fetch', path.resolve(__dirname, 'src/index.js')],
        vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types']
    },
    output: {
        path: absoluteBuildOutputPath, // output path for webpack build on machine, not relative paths for index.html
        filename: `${transpiledSrcOutputPath}/js/[name].[hash:8].bundle.js`,
        chunkFilename: `${transpiledSrcOutputPath}/js/[name].[hash:8].chunk.js`
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
            filename: `${transpiledSrcOutputPath}/css/[name].[contenthash:8].css`
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
            }
        ])
    ],
    optimization: {
        minimizer: [ new TerserJSPlugin(), new OptimizeCSSAssetsPlugin() ],
        splitChunks: {
            cacheGroups: {
                vendor: { // split node_modules (as vendor) from src (as client)
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                styles: {
                    test: scssRegex,
                    name: 'styles',
                    chunks: 'all',
                    enforce: true // collect all CSS into a single file since the separated CSS files contained only duplicate code
                }
            }
        }
    },
    performance: {
        hints: false // disable "entrypoint size limit" warning
    }
};
