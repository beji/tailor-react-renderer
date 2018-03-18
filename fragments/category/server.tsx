import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

import * as ReactDOMServer from 'react-dom/server';
import { createFactory } from 'react';
import { ServerStyleSheet } from 'styled-components';
import App from './app';

const PORT = 3002;

const AppFactory = createFactory(App);
const sheet = new ServerStyleSheet();
const getPathName = (request: any) => url.parse(request.url, true).pathname;

const app = ReactDOMServer.renderToString(
    sheet.collectStyles(AppFactory()));
const styleTags = sheet.getStyleTags();

const server = http.createServer((req: any, res: any) => {
  const pathname = url.parse(req.url).pathname;
  const jsHeader = { 'Content-Type': 'application/javascript' };

  switch (pathname) {
    case '/bundle.js':
      res.writeHead(200, jsHeader);
      return fs.createReadStream('./public/fragments/category.js').pipe(res);
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Link': '<http://localhost:4000/fragment/category/bundle.js>; rel="fragment-script"',
      });
      return res.end(`<div id="categories">${app}</div>${styleTags}`);
  }
});

server.listen(PORT, () => {
  console.log(`Category Fragment Server started at ${PORT}`);
});
