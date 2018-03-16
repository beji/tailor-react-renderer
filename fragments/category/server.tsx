import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';

const PORT = 3002

const server = http.createServer((req: any, res: any) => {
  const pathname = url.parse(req.url).pathname
  const jsHeader = { 'Content-Type': 'application/javascript' }
  switch(pathname) {
    case '/public/bundle.js':
      res.writeHead(200, jsHeader)
      return fs.createReadStream('./public/bundle.js').pipe(res)
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      return res.end('<h2>Geile Kategorien!</h2>')
  }
})

server.listen(PORT, () => {
  console.log(`Category Fragment Server started at ${PORT}`)
})