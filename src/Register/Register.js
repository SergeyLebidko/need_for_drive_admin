import React, {useState} from 'react';
import classNames from 'classnames';
import {useHistory} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import TextField, {TEXT} from '../common_components/TextField/TextField';
import {Link} from 'react-router-dom';
import {getRandomString} from '../utils/common_utils';
import {register} from '../utils/fetch_utils';
import {LOGIN_APP_URL} from '../urls';
import './Register.scss';
import Preloader from "../common_components/Preloader/Preloader";
import ErrorPane from "../common_components/ErrorPane/ErrorPane";

const LETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
const DIGITS = '0123456789';
const AVAILABLE_CHARS = LETTERS + DIGITS + '_';

const PASSWORD_SIZE = 10;

function Register() {
    let [loginValue, setLoginValue] = useState('');
    let [loginErrorText, setLoginErrorText] = useState(null);

    let [passwordValue, setPasswordValue] = useState(getRandomString(PASSWORD_SIZE, true));

    let [registerProcess, setRegisterProcess] = useState(false);
    let [registerError, setRegisterError] = useState(null);

    const history = useHistory();

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

        setRegisterProcess(true);
        register(loginValue, passwordValue)
            .then(() => {
                setRegisterProcess(false);
                history.push(`/${LOGIN_APP_URL}`);
            })
            .catch(err => {
                setRegisterError(err);
                setRegisterProcess(false);
            });
    };

    const clearFormData = () => {
        setLoginValue('');
        setLoginErrorText(null);
        setRegisterProcess(false);
        setRegisterError(null);
    }

    if (registerProcess) return <Preloader/>;

    if (registerProcess) return <ErrorPane error={registerError} handleBackButtonClick={clearFormData}/>;

    const loginWarningClasses = classNames('register__warning_caption', {'shifted_caption': !!loginErrorText});

    return (
        <div className="register">
            <BrandStamp size={LARGE_STAMP}/>
            <div className="register__form_block">
                <h1 className="register__form_caption">Регистрация</h1>
                <TextField
                    label="Логин"
                    fieldType={TEXT}
                    value={loginValue}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginErrorText}
                />
                <span className={loginWarningClasses}>
                    Логин может содержать только английские буквы, цифры и знак подчеркивания.
                    Логин не может начинаться с цифры.
                </span>
                <TextField
                    label="Пароль"
                    fieldType={TEXT}
                    value={passwordValue}
                />
                <span className="register__warning_caption">
                    Запишите или скопируйте созданный пароль и используйте его на странице входа.
                </span>
                <span className="register__create_password" onClick={handleCreatePassword}>
                    Создать новый пароль
                </span>
                <div className="register__control_block">
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