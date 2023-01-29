class PageTemplate {
    constructor() {
        this.baseTitle = 'Pomidoras'
        this.pageTitle = '';
        this.scripts = [];
    }

    headHTML() {
        const title = this.pageTitle === '' ? this.baseTitle : `${this.pageTitle} | ${this.baseTitle}`;
        return `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                    <link rel="manifest" href="/favicon/site.webmanifest">
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                    <meta name="msapplication-TileColor" content="#da532c">
                    <meta name="theme-color" content="#ffffff">
                    <link rel='stylesheet' href='/css/main.css'>
                    <link rel='stylesheet' href='/css/admin.css'>
                </head>`;
    }

    headerHTML() {
        return `<header>
                    <img class='logo' src='/img/logo.png' alt='logo'>
                        <nav>
                            <a href='/'>Home</a>
                            <a href='/about'>About</a>
                            <a href='/services'>Services</a>
                            <a href='/contact'>Contact</a>
                            <a href='/register'>Register</a>
                        </nav>
                        <i class='fa fa-bars'></i>
                    </header>`;
    }

    footerHTML() {
        return `<footer>
                    <p>2023 - All rights reserved :P</p>
                 </footer>`
    }

    scriptHTML() {
        let HTML = '';
        for (const script of this.scripts) {
            HTML += `<script src='/js/${script}.js' type="module"></script>`
        }
        return HTML;
    }

    mainHTML() {
        return `<h1>SOME PAGE TEMPLATE</h1>
                <p>Lorem ipsum doler sit amet.</p>`;
    }

    render() {
        return `<!DOCTYPE html>
                <html lang="en">
                ${this.headHTML()}
                <body>                    
                    ${this.headerHTML()}
                    <main>
                        ${this.mainHTML()}
                    </main>
                    ${this.footerHTML()}
                    ${this.scriptHTML()}                  
                </body>
                </html>`
    }
}

export { PageTemplate }