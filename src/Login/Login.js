import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import TextField, {TEXT, PASSWORD} from '../common_components/TextField/TextField';
import './Login.scss';

function Login({history}) {
    // TODO При реализации функциональности добавить код процедуры авторизации
    const handleLoginButtonClick = () => history.push('/admin');

    return (
        <div className="login">
            <BrandStamp size={LARGE_STAMP}/>
            <div className="login__form_block">
                <h1 className="login__form_caption">Вход</h1>
                <TextField caption="Почта" fieldType={TEXT}/>
                <TextField caption="Пароль" fieldType={PASSWORD}/>
                <div className="login__control_block">
                    <Link to="/">Запросить доступ</Link>
                    <button className="button button_blue" onClick={handleLoginButtonClick}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    history: PropTypes.object
}

export default Login;