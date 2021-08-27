import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../../common/BrandStamp/BrandStamp';
import TextField, {TEXT, PASSWORD} from '../../common/TextField/TextField';
import {login} from '../../../utils/fetch_utils';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import {ADMIN_APP_URL, REGISTER_APP_URL} from '../../../constants/urls';
import './Login.scss';

function Login() {
    let [hasLoginProcess, setHasLoginProcess] = useState(false);
    let [loginProcessError, setLoginProcessError] = useState(null);

    let [loginValue, setLoginValue] = useState('');
    let [passwordValue, setPasswordValue] = useState('');
    let [loginErrorText, setLoginErrorText] = useState(null);
    let [passwordErrorText, setPasswordErrorText] = useState(null);

    const history = useHistory();

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
                history.push(`/${ADMIN_APP_URL}`);
                setHasLoginProcess(false);
            })
            .catch(err => {
                setHasLoginProcess(false);
                if (err.httpStatus === 401) {
                    setLoginErrorText('Возможно, не верный логин');
                    setPasswordErrorText('Возможно, не верный пароль');
                    return;
                }
                setLoginProcessError(err);
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
                    label="Логин"
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
                    <Link to={`/${REGISTER_APP_URL}`}>Запросить доступ</Link>
                    <button className="button button_blue" onClick={handleLoginButtonClick}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;