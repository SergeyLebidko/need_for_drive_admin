import React, {useState} from 'react';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import TextField, {TEXT} from '../common_components/TextField/TextField';
import {Link} from 'react-router-dom';
import {getRandomString} from '../utils/common_utils';
import {LOGIN_APP_URL} from '../urls';
import './Register.scss';

const LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
const DIGITS = '0123456789';
const AVAILABLE_CHARS = LETTERS + DIGITS + '_';

const PASSWORD_SIZE = 10;

function Register() {
    let [loginValue, setLoginValue] = useState('');
    let [loginErrorText, setLoginErrorText] = useState(null);

    let [passwordValue, setPasswordValue] = useState(getRandomString(PASSWORD_SIZE, true));

    const handleChangeLogin = event => {
        const nextValue = event.target.value;

        if (nextValue.length > 0) {
            if (DIGITS.includes(nextValue[0])) return;
            for (let char of nextValue) {
                if (!AVAILABLE_CHARS.includes(char)) return;
            }
        }

        setLoginErrorText(null);
        setLoginValue(nextValue);
    }

    const handleCreatePassword = () => setPasswordValue(getRandomString(PASSWORD_SIZE, true));

    const handleRegisterButtonClick = () => {
        if (loginValue === '') {
            setLoginErrorText('Обязательное поле');
        }
    };

    return (
        <div className="register">
            <BrandStamp size={LARGE_STAMP}/>
            <div className="register__form_block">
                <h1 className="register__form_caption">Регистрация</h1>
                <TextField
                    label="Почта"
                    fieldType={TEXT}
                    value={loginValue}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginErrorText}
                />
                <TextField
                    label="Пароль"
                    fieldType={TEXT}
                    value={passwordValue}
                />
                <span onClick={handleCreatePassword}>Создать новый пароль</span>
                <div className="login__control_block">
                    <Link to={`/${LOGIN_APP_URL}`}>Выполнить вход</Link>
                    <button className="button button_blue" onClick={handleRegisterButtonClick}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;