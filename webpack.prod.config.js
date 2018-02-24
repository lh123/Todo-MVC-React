const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        bundle: "./src/index.tsx",
        vender: ["react", "react-dom"]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/assets",
        publicPath: "assets/"
    },
    devServer: {
        contentBase: "./dist"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: "url-loader?name=imgs/[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vender"
        })
    ]
}
