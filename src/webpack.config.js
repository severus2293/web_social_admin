import path from "path"
const __dirname = path.resolve()
module.exports = {
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname,"webpackdist"),
        filename: "bundle.js"
    },
    target: 'node'
}