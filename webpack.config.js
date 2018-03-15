const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        entry: {
            server: './src/server.tsx'
        },
        output: {
            path: __dirname + '/dist',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        devtool: 'source-map',
        // Add the loader for .ts files.
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                },
            ],
        },
        target: 'node',
        externals: [nodeExternals()]
    }
]