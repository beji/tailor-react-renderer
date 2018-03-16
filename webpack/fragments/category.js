const nodeExternals = require('webpack-node-externals');
const path = require('path');
const common = require('../common');

module.exports = [
    {
        entry: {
            server: './fragments/category/server.tsx'
        },
        output: {
            path: path.join(__dirname, '../../dist/fragments'),
            filename: 'category.js'
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