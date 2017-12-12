require('dotenv').config();

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const VENDOR_LIBS = [
    'antd', 'axios', 'babel-polyfill', 'bluebird', 'bootstrap', 'bootstrap-loader',
    'bootstrap-sass', 'es6-promise', 'file-icons-js', 'highcharts', 'history', 'innersvg-polyfill',
    'jquery', 'jquery-ui', 'lodash', 'lodash-deep', 'material-ui', 'moment', 'pretty-file-icons', 'prop-types', 'react', 'react-addons-css-transition-group', 'react-big-calendar',
    'react-bootstrap', 'react-dom', 'react-faux-dom', 'react-highcharts', 'react-highlight', 'react-redux', 'react-router-bootstrap',
    'react-router-dom', 'react-tap-event-plugin', 'redux', 'redux-form', 'redux-logger', 'redux-promise', 'redux-thunk', 'request-promise'
];

module.exports = webpackMerge(commonConfig, {
    entry: {
        bundle: './client/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root(),
            verbose: true,
            watch: true
        }),
        new HtmlWebpackPlugin({
            template: './client/index.prod.html'
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('./client/d3.js'),
            to: helpers.root('dist/d3.js')
        }]),
        new CopyWebpackPlugin([{
            from: helpers.root('./client/images'),
            to: helpers.root('dist/images')
        }]),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
});