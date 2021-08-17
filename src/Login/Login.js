import React from 'react';
import {ReactComponent as Logo} from '../content/images/logo.svg';
import './Login.scss';

function Login(){
    return (
        <div className="login">
            <header className="login__logo_block">
                <Logo/>
                <h1 className="login__logo_caption">Need for drive</h1>
            </header>
            <main className="login__form_block">
                <h1 className="login__form_caption">Вход</h1>
                Здесь будет компонент входа в систему. А также ссылка на форму регистрации.
            </main>
        </div>
    )
}

export default Login;