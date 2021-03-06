const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = {


    mode: 'production',


    output: {
        clean: true,
        filename: 'main.[fullhash].js' //archivo js del src
    },

    module: {

        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi Webpack App',
            filename: 'index.html',
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ],


}