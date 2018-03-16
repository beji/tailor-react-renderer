module.exports = {
    loaders: {
        tslint: {
            test: /\.tsx$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: { failOnHint: true }
        },
        typescript: {
            test: /\.tsx?$/,
            loader: 'ts-loader'           
        }
    }
}