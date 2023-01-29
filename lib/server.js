import http from 'node:http';
import config from '../config.js';
import { utils } from './utils.js';
import { file } from './file.js';

import { PageHome } from '../pages/home.js';
import { Page404 } from '../pages/404.js';
import { PageAbout } from '../pages/about.js';
import { PageServices } from '../pages/services.js';
import { PageContact } from '../pages/contact.js';
import { PageRegister } from '../pages/register.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const ssl = req.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/\/+/g, '/');

    const extention = utils.fileExtention(trimmedPath);

    const textFileExtensions = ['css', 'js', 'txt', 'svg', 'xml', 'webmanifest', 'md', 'markdown'];
    const binaryFileExtensions = ['jpg', , 'jpeg', 'png', 'ico', 'webp', 'mp3', 'woff2', 'woff', 'ttf'];

    const isTextFile = textFileExtensions.includes(extention);
    const isBinaryFile = binaryFileExtensions.includes(extention);
    const isAPI = trimmedPath.startsWith('api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        json: 'application/json',
        txt: 'text/plain',
        svg: 'text/svg+xml',
        xml: 'application/xml',
        ico: 'image/vnd.microsoft.icon',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        webmanifest: 'application/manifest+json'
    }

    req.on('data', () => {
        console.log('gaunami duomenys...');
    })

    req.on('end', async () => {
        if (isTextFile) {
            const [err, content] = await file.readPublic(trimmedPath);
            res.writeHead(err ? 404 : 200, {
                'Content-Type': MIMES[extention],
                'cache-control': `max-age=${err ? 0 : config.cache}`
            });
            return res.end(err ? 'Sorry, tokio failo nera...' : content);
        }

        if (isBinaryFile) {
            const [err, content] = await file.readPublicBinary(trimmedPath);
            res.writeHead(err ? 404 : 200, {
                'Content-Type': MIMES[extention],
                'cache-control': `max-age=${err ? 0 : config.cache}`
            });
            return res.end(err ? 'Sorry, tokio failo nera...' : content);
        }

        if (isAPI) {
            // 'laikinas' sprendimas 👀
            const [err, content] = [false, 'API funkcijos atsakymas'];

            res.writeHead(err ? 404 : 200, {
                'Content-Type': err ? MIMES.txt : MIMES.json
            });
            return res.end(err ? 'Sorry, nezinau, ko nori...' : JSON.stringify(content));
        }

        if (isPage) {
            let PageClass = server.routes[404];
            if (trimmedPath in server.routes) {
                PageClass = server.routes[trimmedPath];
            }

            const page = new PageClass();

            res.writeHead(200, {
                'Content-Type': MIMES.html
            });
            return res.end(page.render());
        }
    })
});

server.routes = {
    '': PageHome,
    'about': PageAbout,
    'services': PageServices,
    'contact': PageContact,
    'register': PageRegister,
    '404': Page404,
}

server.init = () => {
    const { port } = config;
    server.httpServer.listen(port, () => {
        console.log(`Projekto nuoroda: http://localhost:${port}/`);
    });
}

export { server }