import { PageTemplate } from "../lib/PageTemplate.js"

class PageContact extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Contact';
    }

    mainHTML() {
        return `<h1>Contact us</h1>
            <p>No!</p>`;
    }
}
export { PageContact }