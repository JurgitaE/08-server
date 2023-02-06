import { file } from "../lib/file.js";

const register = {};

register.init = async (data, httpMethod) => {
    const alllowedMethods = ['post'];

    if (alllowedMethods.includes(httpMethod)) {
        return await register[httpMethod](data);
    }
    return [false, 'ERROR: neleistinas HTTP metodas']
}

register.post = async (data) => {
    const { username, email, password } = data;
    // Validacijos:

    // ar geras username?
    // ar geras email?
    // ar geras password?

    // ar username panaudotas?
    // ar email panaudotas?
    // uzsifruoti slaptazodi

    // bandom irasyti duomenis (failas, DB, ...)
    // .data/users/[email].json
    const [err, msg] = await file.create('users', email + '.json', data);

    return [err, err ? 'Nepavyko uzregistruoti vartotojo' : 'Vartotojas sekmingai uzregistruotas.'];
};


register.get = () => { };

register.put = () => { };

register.delete = () => { };

export { register };