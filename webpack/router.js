const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./common');

module.exports = [
    {
        entry: {
            server: './router/router.tsx'
        },
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'router.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        // Add the loader for .ts files.
        module: {
            rules: [
                common.loaders.tslint,                
                common.loaders.typescript
            ],
        },
        target: 'node',
        externals: [nodeExternals()]
    }
]