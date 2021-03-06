import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';

import { Endpoints } from '../common/router_utils';

const PORT = 4000;

interface IEndpointmapping {
    from: string;
    to: string;
}

const Endpointmappings: IEndpointmapping[] = [
    {
        from: Endpoints.fragments.test,
        to: 'http://localhost:3000',
    },
    {
        from: Endpoints.fragments.common,
        to: 'http://localhost:3001',
    },
    {
        from: Endpoints.fragments.category,
        to: 'http://localhost:3002',
    },
];

const server = http.createServer((req, res) => {
  const jsonHeader = { 'Content-Type': 'application/json' };

  if (typeof req.url !== 'undefined') {
    const pathname = url.parse(req.url).pathname;

    if (typeof pathname === 'undefined') {
        res.writeHead(200);
        return res.end('Hello');
    }
    const endpoints = Endpointmappings.filter((mapping) => pathname.startsWith(mapping.from));

    if (endpoints.length !== 1) {
        res.writeHead(404);
        return res.end('Not found');
    }
    const endpoint = endpoints[0];
    const targetUrl = endpoint.to + pathname.replace(endpoint.from, '');

    console.log(`Incoming request for ${pathname}, routing to ${targetUrl}`);
    return http.get(targetUrl, (endpointRes) => {
        res.writeHead(200, endpointRes.headers);
        endpointRes.on('data', (chunk) => {
            res.write(chunk);
        });

        endpointRes.on('end', () => {
            res.end();
        });
    });

  } else {
      return res.end('ok');
  }
});

server.listen(PORT, () => {
  console.log(`Router Server started at ${PORT}`);
});
