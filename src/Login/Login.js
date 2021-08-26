import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../common_components/BrandStamp/BrandStamp';
import TextField, {TEXT, PASSWORD} from '../common_components/TextField/TextField';
import {login} from '../utils/fetch_utils';
import Preloader from '../common_components/Preloader/Preloader';
import ErrorPane from '../common_components/ErrorPane/ErrorPane';
import './Login.scss';

function Login() {
    let [hasLoginProcess, setHasLoginProcess] = useState(false);
    let [loginProcessError, setLoginProcessError] = useState(null);

    let [loginValue, setLoginValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');
    let [loginErrorText, setLoginErrorText] = useState(null);
    let [passwordErrorText, setPasswordErrorText] = useState(null);

    const handleChangeLogin = event => {
        const nextValue = event.target.value;
        setLoginValue(nextValue);
        if (nextValue !== '' && !!loginErrorText) setLoginErrorText('');

    };

    const handleChangePassword = event => {
        const nextValue = event.target.value;
        setPasswordValue(nextValue);
        if (nextValue !== '' && !!passwordErrorText) setPasswordErrorText('');
    };

    const handleLoginButtonClick = () => {
        const hasError = loginValue === '' || passwordValue === '';
        if (loginValue === '') setLoginErrorText('Обязательное поле');
        if (passwordValue === '') setPasswordErrorText('Обязательно поле');
        if (hasError) return;

        setHasLoginProcess(true);
        login(loginValue, passwordValue)
            .then(() => {
                setHasLoginProcess(false);
                history.push('/admin');
            })
            .catch(err => {
                if (err.httpStatus === 401) {
                    setLoginErrorText('Возможно, не верный логин');
                    setPasswordErrorText('Возможно, не верный пароль');
                }
                setLoginProcessError(err);
                setHasLoginProcess(false);
            });
    };

    const clearFormData = () => {
        setHasLoginProcess(false);
        setLoginProcessError(null);
        setLoginValue('');
        setPasswordValue('');
        setLoginErrorText(null);
        setPasswordErrorText(null);
    }

    if (hasLoginProcess) return <Preloader/>;

    if (loginProcessError) return <ErrorPane error={loginProcessError} handleBackButtonClick={clearFormData}/>

    return (
        <div className="login">
            <BrandStamp size={LARGE_STAMP}/>
            <div className="login__form_block">
                <h1 className="login__form_caption">Вход</h1>
                <TextField
                    label="Почта"
                    fieldType={TEXT}
                    value={loginValue}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginErrorText}
                />
                <TextField
                    label="Пароль"
                    fieldType={PASSWORD}
                    value={passwordValue}
                    handleChangeValue={handleChangePassword}
                    errorText={passwordErrorText}
                />
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

export default Login;