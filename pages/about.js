import { PageTemplate } from "../lib/PageTemplate.js"

class PageAbout extends PageTemplate {
    mainHTML() {
        return `<h1>About us</h1>
            <p>Yes!</p>`;
    }
}
export { PageAbout }