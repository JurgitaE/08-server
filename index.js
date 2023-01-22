import { server } from "./lib/server.js";

const app = {};

app.init = () => {
    // trukstamu pradinio turinio generavimas:
    // - folder
    // - file
    // gauti prisijungima prie DB
    // uzkurti serveri
    server.init();
    // const timer = setInterval(() => {
    //     console.log('apsivalymas....');
    //     // reguliarus procesai:
    //     // - info sinchronizavimas/atsinaujinimas
    //     // - failu archyvavimas
    //     // - info agregravimas (statistika)
    //     // - nereikalingos info salinimas:
    //     //      - failu trinimas
    //     //      - DB optimizavimas
    // }, 5000);
}

app.init();
export { app }