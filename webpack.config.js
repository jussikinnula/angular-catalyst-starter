const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    target: 'web',
    cache: true,
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, './node_modules')],
                loaders: [
                    'ts-loader',
                    'angular2-router-loader?loader=system&genDir=assets'
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.styl$/,
                include: [path.resolve(__dirname, './src/app')],
                loader: 'raw-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.styl$/,
                exclude: [path.resolve(__dirname, '../src/app')],
                include: [path.resolve(__dirname, './src/styles')],
                loader: ExtractTextPlugin.extract('raw-loader!postcss-loader!stylus-loader')
            }
        ]
    },

    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    entry: {
        'assets/js/main.js': './src/main',
        'assets/js/vendor.js': './src/vendor',
        'assets/js/polyfills.js': './src/polyfills'
    },

    plugins: [
        new LoaderOptionsPlugin({
            debug: false,
            options: {
                postcss: [
                    autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
                ],
                resolve: {}
            },
        }),
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new ExtractTextPlugin('assets/css/[contenthash:16].css'),
        new OccurrenceOrderPlugin(),
        new CommonsChunkPlugin({
            name: [
                'assets/js/main.js',
                'assets/js/vendor.js',
                'assets/js/polyfills.js'
            ]
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/images',
                to: 'assets/images'
            },
            {
                from: 'src/favicon.ico',
                to: 'favicon.ico'
            }
        ]),
        new HtmlWebpackPlugin({
            chunksSortMode: 'auto',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.pug'
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJsPlugin({
            compress: {
                dead_code: true,
                screw_ie8: true,
                unused: true,
                warnings: false
            },
            mangle: false
        })
    ],

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.resolve('../src'), 'node_modules']
    },

    output: {
        filename: '[name]',
        chunkFilename: 'assets/js/[chunkhash].js',
        path: path.resolve(__dirname, '../target'),
        publicPath: '/'
    },

    node: {
        global: true,
        net: false,
        fs: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
