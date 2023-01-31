const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './entry.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    optimization: {
        // 替换js压缩默认配置
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            extractComments: true,
            terserOptions: {
                output: {
                    beautify: true, // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                    comments: false // 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    collapse_vars: false,
                    reduce_vars: true,
                    pure_funcs: ['console.log'] // 移除console
                }
            }
        })],
    },
    performance: {
        hints: false
    },
    devtool: "eval-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: "./index.html", // 生成的html名称
            inject: "body"
        }),
        new CleanWebpackPlugin()
    ],
}
