const nodeExternals = require('webpack-node-externals');
const path = require('path');
const common = require('../common');

module.exports = [
    {
        entry: {
            server: './fragments/common/server.tsx'
        },
        output: {
            path: path.join(__dirname, '../../dist/fragments'),
            filename: 'common.js'
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
    },
    {
        entry: {
            client: './fragments/common/client.tsx'
        },
        output: {
            path: path.join(__dirname, '../../public/fragments'),
            filename: 'common.js',
            libraryTarget: 'amd'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                common.loaders.tslint,                
                common.loaders.typescript
            ],
        },
        target: 'web'
    }
]