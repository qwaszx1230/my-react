var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var PACKAGE = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 项目源码路径
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var del = require('del');
del(BUILD_PATH)

// 从配置文件获取env or  直接从环境获取
var env = 'development';
var is_dev = process.env.NODE_ENV === 'development';

var target = 'https://uatyeeofficeworkflowcenter.yeeoffice.com/flowcraft/_api/ver(3.0)/';

var proxy = {};
var plugins = [
    new MiniCssExtractPlugin({
        filename: "app.css"
    }),
    new HtmlWebpackPlugin({
        favicon: './favicon.ico', //favicon路径
        filename: '../index.html',
        template: "./src/index.html",
        inject: true,
        hash: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    })
]
if (is_dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    proxy = {
        "/api/*": {
            changeOrigin: true,
            target: target,
            secure: false
        },
        "/common/api/*": {
            target: target,
            secure: false
        }
    }
} else {
    plugins.push(new webpack.BannerPlugin({
        banner: `${PACKAGE.description}\r\n@version v${PACKAGE.version}\r\n@author @copyright 2017 ${PACKAGE.author} \r\n@link https://www.yeeoffice.com/\r\n@date ${new Date()}`,
        raw: false,
        entryOnly: false
    }));
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }));
    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ch/));
}

var publicPath = "./dist/";
var cdn = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ver1.2/";
var iconOSS = "//yeeoffice-mysql.oss-cn-hangzhou.aliyuncs.com/yeeoffice/dev/ideas/";
var ideasSettingsApi = "https://swireproperties.yeeoffice.cn/api/_api/ver(3.0)/";
var ideasDocumenyApi = "https://uat.yeeoffice.cn/YeeOfficeDocument_Net/_API/Ver(3.0)/";

if (process.env.NODE_ENV === 'uat') {
    publicPath = "https://swireproperties.yeeoffice.cn/js/uat/";
    cdn = "https://swireproperties.yeeoffice.cn/";
}  else if (process.env.NODE_ENV === 'production') {
    publicPath = "//cdn.yungalaxy.com/yeeoffice/pub/ver3.0/js/workflow3.0/";
    cdn = "//cdn.yungalaxy.com/yeeoffice/pub/ver3.0/";
}
console.log('JS资源地址：', publicPath);
plugins.push(new webpack.DefinePlugin({
    'process.env': {
        "IconOSS": JSON.stringify(iconOSS),
        "CDN": JSON.stringify(cdn),
        "ideasDocumenyApi": JSON.stringify(ideasDocumenyApi),
        "ideasSettingsApi": JSON.stringify(ideasSettingsApi),
    }
}));

module.exports = {
    mode: is_dev ? 'development' : 'production',
    devtool: is_dev ?
        'source-map' : "none",
    entry: {
        app: ['./src/app']
    },
    optimization: {
        splitChunks:{
            automaticNameDelimiter: '-',
        },
        minimizer: is_dev ? [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 5,
                    mangle: true,
                    ie8:true,
                    safari10: true
                },
                sourceMap: true
            })
        ] : [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 5,
                    mangle: true,
                    ie8: true,
                    safari10: true
                },
                sourceMap: true
            })
        ]
    },
    output: {
        path: is_dev ?
            "/" : BUILD_PATH,
        publicPath: is_dev ?
            '/' : publicPath,
        filename: is_dev ?
            '[name].js' : '[name].js',
        chunkFilename: is_dev ?
            '[name].js' : '[name]-' + process.env.NODE_ENV + '-[hash:5].js'
    },
    devServer: {
        proxy: proxy,
        host: '0.0.0.0'
    },
    module: {
        rules: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            use: 'ts-loader'
            // loader: 'ts-loader'
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=50000&name=[path][name].[ext]'
        }, {
            test: /\.(less|css)$/,
            exclude: /^node_modules$/,
            use: [
                is_dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
            ]
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx'
        ],
        alias: {}
    },
    externals: []
}
