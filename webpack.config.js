const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    target: 'web',
    cache: true,
    debug: false,
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [path.resolve(__dirname, './node_modules')],
                loader: 'ts'
            },
            {
                test: /\.pug$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.styl$/,
                exclude: [path.resolve(__dirname, './src/styles')],
                include: [path.resolve(__dirname, './src')],
                loader: 'raw!postcss-loader!stylus-loader'
            },
            {
                test: /\.styl$/,
                include: [path.resolve(__dirname, './src/styles')],
                loader: ExtractTextPlugin.extract('raw!postcss-loader!stylus-loader')
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

    postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
    ],

    plugins: [
        new ExtractTextPlugin('assets/css/[contenthash:16].css'),
        new DedupePlugin(),
        new OccurenceOrderPlugin(),
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
            chunksSortMode: 'none',
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
        extensions: ['', '.ts', '.js', '.json'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('./src')
    },

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, './root'),
        publicPath: '/'
    },

    node: {
        net: false,
        fs: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
