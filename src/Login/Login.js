import React from 'react';
import {Link} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import './Login.scss';

function Login(){
    return (
        <div className="login">
            <BrandStamp size={LARGE_STAMP}/>
            <main className="login__form_block">
                <h1 className="login__form_caption">Вход</h1>
                <div className="login__post">
                    <label>Почта</label>
                    <input type="text" className="text_field"/>
                </div>
                <div className="login__password">
                    <label>Пароль</label>
                    <input type="password" className="text_field"/>
                </div>
                <div className="login__control_block">
                    <Link to="/">Запросить доступ</Link>
                    <button className="button button_blue">Войти</button>
                </div>
            </main>
        </div>
    )
}

export default Login;