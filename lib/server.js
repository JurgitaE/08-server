import http from 'node:http';
import config from '../config.js';

import { PageHome } from '../pages/home.js';
import { Page404 } from '../pages/404.js';
import { PageAbout } from '../pages/about.js';
import { PageServices } from '../pages/services.js';
import { PageContact } from '../pages/contact.js';
import { utils } from './utils.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const ssl = req.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/\/+/g, '/');

    const extention = utils.fileExtention(trimmedPath);

    const isTextFile = ['css', 'js'].includes(extention);
    const isBinaryFile = ['jpg', 'png', 'ico'].includes(extention);
    const isAPI = trimmedPath.includes('api');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    req.on('data', () => {
        console.log('gaunami duomenys...');
    })

    req.on('end', () => {
        if (isTextFile) {
            res.end(`STAI TAU TEKSTINIO FAILO TURINYS...`);
        }

        if (isBinaryFile) {
            res.end(`STAI TAU BINARY FAILO TURINYS...`);
        }

        if (isAPI) {
            res.end(`STAI TAU API ATSAKYMAS...`);
        }

        if (isPage) {
            let PageClass = server.routes[404];
            if (trimmedPath in server.routes) {
                PageClass = server.routes[trimmedPath];
            }

            const page = new PageClass;
            res.end(page.render());
        }
    })
});

server.routes = {
    '': PageHome,
    'about': PageAbout,
    'services': PageServices,
    'contact': PageContact,
    '404': Page404,

}

server.init = () => {
    const { port } = config;
    server.httpServer.listen(port, () => {
        console.log(config);
        console.log(`Projekto nuoroda: http://localhost:${port}/`);
    });
}

export { server }