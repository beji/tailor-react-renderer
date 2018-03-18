const nodeExternals = require('webpack-node-externals');
const path = require('path');
const common = require('./common');

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
                    test: /\.css$/,
                    use: [ 'to-string-loader', 'css-loader' ]
                },                
                common.loaders.tslint,                
                common.loaders.typescript
            ],
        },
        target: 'node',
        externals: [nodeExternals()]
    }
]