const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

declare var process;

// Common
export default {
  devtool: 'source-map',
  target: 'web',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ path.resolve('./node_modules') ]
  },

  entry: {
    main: './src/main',
    vendor: './src/vendor',
    polyfills: './src/polyfills'
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e|d)\.ts$/],
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.pug/,
        use: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'exports-loader?module.exports.toString()',
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=8192&name=assets/fonts/[name].[ext]?[hash]'
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve('./src'),
      {}
    ),

    new NormalModuleReplacementPlugin(
      /facade(\\|\/)async/,
      path.resolve('./node_modules/@angular/core/src/facade/async.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)collection/,
      path.resolve('./node_modules/@angular/core/src/facade/collection.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)errors/,
      path.resolve('./node_modules/@angular/core/src/facade/errors.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)lang/,
      path.resolve('./node_modules/@angular/core/src/facade/lang.js')
    ),
    new NormalModuleReplacementPlugin(
      /facade(\\|\/)math/,
      path.resolve('./node_modules/@angular/core/src/facade/math.js')
    ),

    new LoaderOptionsPlugin({
      debug: false,
      options: {
        postcss: [
          autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
        ],
        resolve: {}
      }
    }),

    new FaviconsWebpackPlugin({
      logo: './src/favicon.png',
      prefix: 'assets/favicon/',
      emitStats: false,
      statsFilename: 'iconstats.json',
      inject: true,
      background: '#ffffff',
      title: 'Angular Catalyst Starter'
    }),

    new UglifyJsPlugin({
      // beautify: true,
      // mangle: false,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      sourceMap: true
    }),

    new CommonsChunkPlugin({
      names: ['vendor', 'polyfills'],
      filename: 'assets/js/[name].[hash].js',
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      chunksSortMode: 'auto',
      filename: 'index.html',
      hash: true,
      inject: 'body',
      template: './src/index.pug'
    })
  ],

  output: {
    filename: 'assets/js/[name].[hash].js',
    path: path.resolve('./root'),
    publicPath: '/'
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },

  devServer: {
    contentBase: './root',
    historyApiFallback: true,
    host: 'localhost',
    port: 5000,
    proxy: {
      '/rest': {
        target: 'http://localhost:12051',
        secure: false
      }
    },
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
};
