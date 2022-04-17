const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry : ["regenerator-runtime/runtime.js", "./src/index.js"],
    output : {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: [{
                loader: 'style-loader',
                }, {
                loader: 'css-loader', // translates CSS into CommonJS
                }, {
                loader: 'less-loader', // compiles Less to CSS
                options: {
                   lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                       'primary-color': '#1DA57A',
                       'link-color': '#1DA57A',
                       'border-radius-base': '2px',
                     },
                     javascriptEnabled: true,
                   },
                 },
                }]
            }

        ]
    },
    resolve: {
         extensions: [".js", ".jsx"]
    }

}