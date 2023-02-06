import http from 'node:http';
import { StringDecoder } from 'node:string_decoder';
import config from '../config.js';
import { utils } from './utils.js';
import { file } from './file.js';

// PAGES
import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageAbout } from '../pages/PageAbout.js';
import { PageServices } from '../pages/PageServices.js';
import { PageContact } from '../pages/PageContact.js';
import { PageRegister } from '../pages/PageRegister.js';

// API
import { register } from '../api/register.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const ssl = req.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method ? req.method.toLowerCase() : 'get';
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

    let buffer = '';
    const stringDecoder = new StringDecoder('utf-8');
    req.on('data', (data) => {
        buffer += stringDecoder.write(data);
    });

    req.on('end', async () => {
        buffer += stringDecoder.end();

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
            const api = trimmedPath.split('/')[1];
            let [err, content] = [true, 'Sorry, nezinau, ko nori...'];

            if (api in server.api) {
                try {
                    const data = JSON.parse(buffer);
                    const apiObj = server.api[api];

                    [err, content] = await apiObj.init(data, httpMethod);
                } catch {
                    content = 'Nepavyko isparsinti JSON duomenu';
                }
            }

            res.writeHead(err ? 404 : 200, {
                'Content-Type': err ? MIMES.txt : MIMES.json
            });
            return res.end(JSON.stringify(content));
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

server.api = {
    register,
}

server.init = () => {
    const { port } = config;
    server.httpServer.listen(port, () => {
        console.log(`Projekto nuoroda: http://localhost:${port}/`);
    });
}

export { server };
