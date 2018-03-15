import * as http from 'http';
const Tailor = require('node-tailor');
import * as path from 'path';
import * as url from 'url';

import App from './App';
import { renderToString } from 'react-dom/server';
import { createFactory } from 'react';

const AppFactory = createFactory(App);

const getPathName = (request: any) => url.parse(request.url, true).pathname;

const fetchTemplate = (request: any, parseTemplate: any) => {
    const pathName = getPathName(request);

    switch (pathName) {
        case '/': 
            return parseTemplate(renderToString(AppFactory()));
        default:
            return parseTemplate(renderToString(AppFactory()));
    }
}

const tailor = new Tailor({fetchTemplate});
const server = http.createServer(tailor.requestHandler);

server.listen(8080);