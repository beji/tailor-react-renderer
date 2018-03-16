import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';

import { Endpoints } from '../common/router_utils'

const PORT = 4000;

interface Endpointmapping {
    from: string,
    to: string
}

const Endpointmappings: Endpointmapping[] = [
    {
        from: Endpoints.fragments.category,
        to: 'http://localhost:3002'
    },
    {
        from: Endpoints.fragments.test,
        to: 'http://localhost:3000'
    }
]

const server = http.createServer((req, res) => {
  const jsonHeader = { 'Content-Type': 'application/json' }

  if (typeof req.url !== 'undefined'){
    const pathname = url.parse(req.url).pathname;
    let endpoints = Endpointmappings.filter(mapping => mapping.from === pathname).map(mapping => mapping.to);

    if (endpoints.length !== 1){
        res.writeHead(404);
        return res.end('Not found');
    }
    const endpoint = endpoints[0];
    console.log(`Incoming request for ${pathname}, routing to ${endpoint}`);
    return http.get(endpoint, (endpointRes) => {
        res.writeHead(200, endpointRes.headers);
        endpointRes.on('data', chunk => {
            res.write(chunk);
        });

        endpointRes.on('end', () => {
            res.end();
        });
    });

  }
  else{
      return res.end('ok');
  }

})

server.listen(PORT, () => {
  console.log(`Router Server started at ${PORT}`)
})

