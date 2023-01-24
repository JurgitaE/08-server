import http from 'node:http';
import config from '../config.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const ssl = req.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/\/+/g, '/');

    req.on('data', () => {
        console.log('gaunami duomenys...');
    })

    req.on('end', () => {
        let HTML = server.routes[404];
        if (trimmedPath in server.routes) {
            HTML = server.routes[trimmedPath];
        }

        res.end(HTML);
    })
});

server.routes = {
    '': `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    HOME CONTENT
                </body>
                </html>`,
    'about': `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    ABOUT PSL CONTENT
                </body>
                </html>`,
    'services': `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    SERVICES PAGE
                </body>
                </html>`,
    '404': `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    404 - not found
                </body>
                </html>`,
}

server.init = () => {
    const { port } = config;
    server.httpServer.listen(port, () => {
        console.log(config);
        console.log(`Projekto nuoroda: http://localhost:${port}/`);
    });
}

export { server }