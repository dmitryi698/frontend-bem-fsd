const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    pages: 'pages/'
}

const PAGES_DIR = `${PATHS.src}/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter((file) => { return file.indexOf('base') !== 0; })

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        app: `${PATHS.src}/index.js`
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            }, {
                test: /\.(woff(2)?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]',
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[ext]',
                }
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js')
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js')
                            }
                        }
                    }
                ]
            },

        ]
    },
    resolve: {
        // extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '~': PATHS.src,
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
            // { from: `${PATHS.src}/components/`, to: `${PATHS.assets}img/`, context: 'img/', },
            // { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '' },
            ]
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}/${page}.pug`,
            filename: `./${page}.html`,
            inject: true,
            minify: false,
        })),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
        // new HtmlWebpackPlugin({
        //     template: `${PATHS.src}/index.html`,
        //     filename: './index.html',
        //     inject: true
    ]
}
