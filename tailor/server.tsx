import * as http from 'http';
const Tailor = require('node-tailor');
import * as path from 'path';
import * as url from 'url';

import App from './App';
import * as ReactDOMServer from 'react-dom/server';
import { createFactory } from 'react';
import { Endpoints, getRouterUrl } from '#common#/router_utils';
import { ServerStyleSheet } from 'styled-components';
import normalize from './normalize';

const PORT = 8080;
const AppFactory = createFactory(App);
const sheet = new ServerStyleSheet();
const getPathName = (request: any) => url.parse(request.url, true).pathname;

const app = ReactDOMServer.renderToString(
    sheet.collectStyles(AppFactory({
        fragmentEndpoint: getRouterUrl(Endpoints.fragments.test),
        categoryFragmentEndpoint: getRouterUrl(Endpoints.fragments.category),
})));
const styleTags = sheet.getStyleTags();

const fetchTemplate = (request: any, parseTemplate: any) => {
    const pathName = getPathName(request);

    const home = `
    <html>
        <head>
            <style>${normalize}</style>
            ${styleTags}
        </head>
        <script>
        (function(d) {
            require(d);
            var arr = [ 'react', 'react-dom', 'styled-components' ];
            while (i = arr.pop())(function(dep) {
              define(dep, d, function(b) {
                return b[dep];
              })
            })(i);
          }(['${getRouterUrl(Endpoints.fragments.common)}/bundle.js']));
        </script>
        <body>
            ${app}
        </body>
    </html>
    `;

    switch (pathName) {
        case '/':
            return parseTemplate(home);
        default:
            return parseTemplate(home);
    }
};

const tailor = new Tailor({fetchTemplate});
const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        return res.end('');
    }
    tailor.requestHandler(req, res);
});

console.log(`Tailor Server started at ${PORT}`);
server.listen(PORT);
