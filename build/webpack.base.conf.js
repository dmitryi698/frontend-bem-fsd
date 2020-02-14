const path = require('path')
const fs = require('fs')
// const Glob = require('glob-all')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PurgeCssPlugin = require('purgecss-webpack-plugin')
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
const PAGES = fs.readdirSync(PAGES_DIR).filter((file) => {return file.includes('base') !== 0;})

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
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
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader',
            },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
            },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options:{
                name: '[name].[ext]',
                }
            },{
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            }
            },{
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                }
            ]
        },
        ]},
    resolve:{
        alias:{
            '@': PATHS.src,
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        // new PurgeCssPlugin({
        //     paths: glob.sync([
        //         `${ PAGES_DIR }/**/*.pug`,
        //         `${PATHS.src}/*.js`
        //     ])
        // }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/components/`, to: `${PATHS.assets}img/[name].[ext]`, ignore: ['*.js', '*.css', '*.scss', '*.pug'], toType: 'template',},
            { from: `${PATHS.src}/pages/`, to: `${PATHS.assets}img/[name].[ext]`, ignore: ['*.js', '*.css', '*.scss', '*.pug'], toType: 'template',},
            { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '' },
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}/${page}.pug`,
            filename: `${page}.html`,
            inject: true,
        })),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
        // new HtmlWebpackPlugin({
        //     template: `${PATHS.src}/index.html`,
        //     filename: './index.html',
        //     inject: true
    ]
}