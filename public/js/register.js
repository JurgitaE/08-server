const usernameDOM = document.getElementById('username');
const emailDOM = document.getElementById('email');
const passDOM = document.getElementById('pass');
const repassDOM = document.getElementById('repass');
const tosDOM = document.getElementById('tos');
const submitDOM = document.querySelector('form button');

const is = {
    string: (str) => typeof str === 'string' && str.trim() !== '',
    minSize: (str, size) => str.length >= size,
    maxSize: (str, size) => str.length <= size,
    username: (str) => is.string(str) && is.minSize(str, 4) && is.maxSize(str, 20),
    email: (str) => is.string(str) && is.minSize(str, 6) && is.maxSize(str, 50) && str.includes('@'),
    pass: (str) => is.string(str) && is.minSize(str, 8) && is.maxSize(str, 100),
    tos: () => true,
}

if (submitDOM) {
    function sumbitForm(e) {
        e.preventDefault();

        const usernameValid = is.username(usernameDOM.value);
        const emailValid = is.email(emailDOM.value);
        const passValid = is.pass(passDOM.value);
        const repassValid = is.pass(repassDOM.value);

        if (!usernameValid) {
            console.log('Blogas username');
        }
        if (!passValid) {
            console.log('Blogas password');
        }
        if (!emailValid) {
            console.log('Blogas email');
        }
        if (!repassValid) {
            console.log('Blogas repeat password');
        }
        if (!tosDOM.checked) {
            console.log('Nesutikai su TOS');
        }

        const samePass = passDOM.value === repassDOM.value;
        if (!samePass) {
            console.log('Password ir repear passowrd nesutampa');
        }

        if (usernameValid && passValid && emailValid && samePass) {
            console.log('Viskas ok');
        }
    }

    submitDOM.addEventListener('click', sumbitForm);

    // setTimeout(() => {
    //     submitDOM.removeEventListener('click', clickLogic);
    // }, 3000)
}
