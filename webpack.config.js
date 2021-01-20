const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
                chunks: 'all'
        }
    }

    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}


console.log('IsDev: ', isDev);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, //css-загрузчик
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: 
                        {
                            publicPath: ''
                        }
                    }, 
                    {
                        loader: 'css-loader'
                }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.less$/, //css-загрузчик
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: 
                        {
                            publicPath: ''
                        }
                    }, 
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}