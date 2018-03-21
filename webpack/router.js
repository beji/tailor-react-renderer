const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./common');

const FallbackDirectoryResolverPlugin = require('./fallback');

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
            extensions: ['.tsx'],
            plugins: [
                new FallbackDirectoryResolverPlugin(
                    {
                        prefix: 'common',
                        directories: [
                            // this is the fallback directory chain. The plugin tries to resolve the file first 
                            // in the `src/${language}` folder. If it can't be found there, it will try to resolve it in the next directory in the chain, and so on...
                            './common'
                        ]
                    }
                )
            ]
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