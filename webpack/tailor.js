const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = [
    {
        entry: {
            server: './tailor/server.tsx'
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'tailor.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
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