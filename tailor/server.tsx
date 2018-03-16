import * as http from 'http';
const Tailor = require('node-tailor');
import * as path from 'path';
import * as url from 'url';

import App from './App';
import * as ReactDOMServer from 'react-dom/server';
import { createFactory } from 'react';
import { Endpoints, getRouterUrl } from '../common/router_utils';

const PORT = 8080;
const AppFactory = createFactory(App);

const getPathName = (request: any) => url.parse(request.url, true).pathname;

const home = ReactDOMServer.renderToString(AppFactory({
    fragmentEndpoint: getRouterUrl(Endpoints.fragments.test),
    categoryFragmentEndpoint: getRouterUrl(Endpoints.fragments.category),
}));

const fetchTemplate = (request: any, parseTemplate: any) => {
    const pathName = getPathName(request);

    switch (pathName) {
        case '/':
            return parseTemplate(home);
        default:
            return parseTemplate(home);
    }
};

const tailor = new Tailor({fetchTemplate});
const server = http.createServer(tailor.requestHandler);

console.log(`Tailor Server started at ${PORT}`);
server.listen(PORT);
