const webpack = require("webpack");
const path = require("path");

module.exports = {
    target: "node",
    entry: {
        bundle: "./src/server-entry.tsx"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist/ssr/assets",
        publicPath: "assets/",
        libraryTarget: "commonjs2"
    },
    devServer: {
        contentBase: "./dist"
    },
    devtool: "source-map",
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
                use: ["simple-universal-style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: "url-loader?name=imgs/[name].[ext]"
            }
        ]
    }
}
