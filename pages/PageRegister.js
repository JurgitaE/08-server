import { PageTemplate } from "../lib/PageTemplate.js"

class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.scripts = ['register'];
    }

    mainHTML() {
        return `<h1>Register</h1>
                <form class='form' action='/api/register' method='POST'>
                    <div class='form-row'>
                        <label for='username'>Username</label>
                        <input id='username' type='text' required value='Chuck'>
                    </div>
                    <div class='form-row'>
                        <label for='email'>Email</label>
                        <input id='email' type='email' required value='chuck@norris.roundkick'>
                    </div>
                    <div class='form-row'>
                        <label for='pass'>Password</label>
                        <input id='pass' type='password' required value='chuck@norris.roundkick'>
                    </div>
                    <div class='form-row'>
                        <label for='repass'>Repeat password</label>
                        <input id='repass' type='password' required value='chuck@norris.roundkick'>
                    </div>
                    <div class='form-row'>
                        <label for='tos'><input id='tos' type='checkbox' required checked>Sutinku su <a href='/tos'>taisyklemis</a></label>                      
                    </div>
                    <div class='form-row'>
                        <button type='submit'>Register now!</button>                    
                    </div>
                </form>`;
    }
}
export { PageRegister }