const ROUTER = 'http://localhost:4000';

import * as http from 'http';

export const Endpoints = {
    routerAddress: ROUTER,
    fragments: {
        test: '/fragment/test',
        category: '/fragment/category',
        common: '/fragment/common',
    },
};

export const getRouterUrl = (path: string) => `${Endpoints.routerAddress}${path}`;
