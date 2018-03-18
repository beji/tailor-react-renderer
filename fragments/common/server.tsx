import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

const PORT = 3001;

const server = http.createServer((req: any, res: any) => {
  const pathname = url.parse(req.url).pathname;
  const jsHeader = { 'Content-Type': 'application/javascript' };

  switch (pathname) {
    case '/bundle.js':
      res.writeHead(200, jsHeader);
      return fs.createReadStream('./public/fragments/common.js').pipe(res);
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Link': '<http://localhost:4000/fragment/common/bundle.js>; rel="fragment-script"',
      });
      return res.end('');
  }
});

server.listen(PORT, () => {
  console.log(`Common Fragment Server started at ${PORT}`);
});
