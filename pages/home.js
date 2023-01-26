import { PageTemplate } from "../lib/PageTemplate.js"

class PageHome extends PageTemplate {
    mainHTML() {
        return `<h1>Welcome to HOME PAGE!</h1>
        <img src='/img/yoga.png' alt='Yoga'>`;
    }
}
export { PageHome }