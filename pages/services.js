import { PageTemplate } from "../lib/PageTemplate.js"

class PageServices extends PageTemplate {
    mainHTML() {
        return `<h1>Services</h1>
            <p>Give me your money!</p>`;
    }
}
export { PageServices }