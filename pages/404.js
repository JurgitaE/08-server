import { PageTemplate } from "../lib/PageTemplate.js"

class Page404 extends PageTemplate {
    mainHTML() {
        return `<h1>404!</h1>
            <p>Page not found!</p>`;
    }
}
export { Page404 }