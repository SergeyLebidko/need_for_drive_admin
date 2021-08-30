import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import BrandStamp, {LARGE_STAMP} from '../../common/BrandStamp/BrandStamp';
import TextField from '../../common/TextField/TextField';
import PasswordField from '../../common/PasswordField/PasswordField';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import {ADMIN_APP_URL, REGISTER_APP_URL} from '../../../constants/urls';
import {login} from '../../../utils/fetch_utils';
import './Login.scss';

function Login() {
    const [hasLoginProcess, setHasLoginProcess] = useState(false);
    const [loginProcessError, setLoginProcessError] = useState(null);

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loginErrorText, setLoginErrorText] = useState(null);
    const [passwordErrorText, setPasswordErrorText] = useState(null);

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

    const handleLoginButtonClick = event => {
        event.preventDefault();

        const hasError = loginValue === '' || passwordValue === '';
        if (loginValue === '') setLoginErrorText('Обязательное поле');
        if (passwordValue === '') setPasswordErrorText('Обязательно поле');
        if (hasError) return;

        setHasLoginProcess(true);
        login(loginValue, passwordValue)
            .then(() => {
                history.push(`/${ADMIN_APP_URL}`);
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
            <form className="form">
                <h1 className="login__form_caption">Вход</h1>
                <TextField
                    label="Логин"
                    value={loginValue}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginErrorText}
                />
                <PasswordField
                    label="Пароль"
                    value={passwordValue}
                    handleChangeValue={handleChangePassword}
                    errorText={passwordErrorText}
                />
                <div className="login__control_block">
                    <Link to={`/${REGISTER_APP_URL}`}>Запросить доступ</Link>
                    <button type="submit" className="button button_blue" onClick={handleLoginButtonClick}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;