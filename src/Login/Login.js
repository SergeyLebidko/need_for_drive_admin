import React from 'react';
import {Link} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import TextField, {TEXT, PASSWORD} from '../common_components/TextField/TextField';
import './Login.scss';

function Login() {
    return (
        <div className="login">
            <BrandStamp size={LARGE_STAMP}/>
            <div className="login__form_block">
                <h1 className="login__form_caption">Вход</h1>
                <TextField caption="Почта" fieldType={TEXT}/>
                <TextField caption="Пароль" fieldType={PASSWORD}/>
                <div className="login__control_block">
                    <Link to="/">Запросить доступ</Link>
                    <button className="button button_blue">Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Login;