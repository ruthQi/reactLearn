
'use strict';
var path = require('path');
var webpack = require('webpack');
var utils = require('./utils.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var getConfig = function(env) {
    var isDev = env == 'development';
    //使用cssModules时抽离css
    const plugin = new ExtractTextPlugin('../../styles/pages/[name].css');//new ExtractTextPlugin('../../styles/pages/[name].css')
    if (!isDev) {
        plugins = plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        ]);
    }
    return {
        cache: true,
        context: path.join(process.cwd(), ''),
        entry: {},
        output: {
            path: path.join(process.cwd(), './public/dist/scripts/pages'),
            filename: '[name].js',
            publicPath: './public/dist/'
        },
        externals: {},
        module: {
            rules: [{
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader",
                query: {}
            }, {
                test: /\.css$/,
                //CSS-loader's default hash algorithm is [hash:base64]
                //loader: 'style-loader!css-loader?modules'
                use: plugin.extract({ use: { loader: 'css-loader', options: { modules: true } }, fallback: 'style-loader'}),
                //使用以下方式修改生成的文件名称
                //loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, {
                    //使用postcss解析，不用sass解析
                   loader: 'postcss-loader',
                   options: {
                       sourceMap: true,
                       config: {
                          path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                       }
                   }
                }/*,{
                    loader: 'sass-loader',
                    options: {
                       sourceMap: true,
                    }
                }*/]
            }, {
                test: /\.js$/,
                exclude:  /(node_modules\/(?!whs)|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: [
                        ['es2015', {
                            'loose': true,
                            'modules': false
                        }],
                        'babel-preset-stage-0'
                    ],
                    plugins: [
                       'add-module-exports',
                       'transform-decorators-legacy',
                       'transform-class-properties',
                       'transform-object-rest-spread',
                       ['transform-runtime', {helpers: false, polyfill: false, regenerator: true}]
                    ]
                }
            }, {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }]
        },
        resolve: {
            extensions: ['.js', '.jsx', 'vue', '.scss'],
            modules: [path.resolve('./public/scripts/'), path.resolve('./public/scss/'), path.resolve('./node_modules/')],
            alias: {
                scss: path.resolve('./public/scss/'),
                vue: 'vue/dist/vue.common.js'
            }
        },
        plugins: [plugin]
    };
};


module.exports = function(conf, env) {
    var filelist = [],
        entry = {};
    var _path = path.resolve(process.cwd(), conf.src);
    //console.log(_path)
    utils.getFiles(_path, function(_path) {
        filelist.push(_path);
    });
    filelist.forEach(function(item) {
        var arr = utils.slash(item).match(conf.regexp);
        entry[arr[1]] = ['.' + arr[0]];
    });
    filelist = [];
    return utils.extend(getConfig(env), {
        entry: entry
    });
};
