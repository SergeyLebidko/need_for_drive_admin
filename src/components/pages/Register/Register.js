import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import BrandStamp, {LARGE_STAMP} from '../../common/BrandStamp/BrandStamp';
import TextField from '../../common/TextField/TextField';
import {Link} from 'react-router-dom';
import {getRandomString} from '../../../utils/common_utils';
import {register} from '../../../utils/fetch_utils';
import {LOGIN_APP_URL} from '../../../constants/urls';
import {ALL_CHARS, LETTER_CHARS, DIGIT_CHARS, PASSWORD_SIZE} from '../../../constants/settings';
import './Register.scss';
import ControlledPasswordField from "../../common/ControlledPasswordField/ControlledPasswordField";

function Register() {
    const [loginValue, setLoginValue] = useState('');
    const [loginErrorText, setLoginErrorText] = useState(null);

    const [passwordValue, setPasswordValue] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState(null);
    const [hasShowPassword, setHasShowPassword] = useState(false);

    const [registerProcess, setRegisterProcess] = useState(false);
    const [registerError, setRegisterError] = useState(null);

    const history = useHistory();

    const handleChangeLogin = event => {
        const nextValue = event.target.value;

        if (nextValue.length > 0) {
            if (DIGIT_CHARS.includes(nextValue[0])) return;
            for (const char of nextValue) {
                if (!ALL_CHARS.includes(char)) return;
            }
        }

        setLoginErrorText(null);
        setLoginValue(nextValue);
    }

    const handleChangePassword = event => {
        const nextValue = event.target.value;

        setPasswordErrorText(null);
        setPasswordValue(nextValue);
    }

    const handleCreatePassword = () => {
        setPasswordValue(getRandomString(PASSWORD_SIZE, true));
        setHasShowPassword(true);
        setPasswordErrorText(null);
    };

    const handleShowPasswordControlClick = () => setHasShowPassword(!hasShowPassword);

    const handleRegisterButtonClick = event => {
        event.preventDefault();

        // Проверяем валидность полей с логином и паролем
        let _loginErrorText = '';
        const _passwordErrorText = [];
        if (loginValue === '') _loginErrorText = 'Обязательное поле.';
        if (passwordValue === '') {
            _passwordErrorText.push('Обязательное поле.');
        } else {
            if (passwordValue.length < PASSWORD_SIZE) _passwordErrorText.push(`Длина пароля менее ${PASSWORD_SIZE} знаков`);
            let findDigit = false;
            let findLetter = false;
            for (const char of passwordValue) {
                if (LETTER_CHARS.includes(char)) findLetter = true;
                if (DIGIT_CHARS.includes(char)) findDigit = true;
                if (findLetter && findDigit) break;
            }
            if (!findLetter) _passwordErrorText.push('Пароль не содержит английские буквы.');
            if (!findDigit) _passwordErrorText.push('Пароль не содержит цифры.');
        }
        if (_loginErrorText) setLoginErrorText(_loginErrorText);
        if (_passwordErrorText) setPasswordErrorText(_passwordErrorText.join(' '));
        if (_passwordErrorText || _loginErrorText.length > 0) return;

        // Отправляем данные для регистрации
        setRegisterProcess(true);
        register(loginValue, passwordValue)
            .then(() => {
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
        setPasswordValue('');
        setPasswordErrorText(null);
        setHasShowPassword(false);
        setRegisterProcess(false);
        setRegisterError(null);
    }

    if (registerProcess) return <Preloader/>;

    if (registerError) return <ErrorPane error={registerError} handleBackButtonClick={clearFormData}/>;

    return (
        <div className="register">
            <BrandStamp size={LARGE_STAMP}/>
            <form className="form">
                <h1 className="register__form_caption">Регистрация</h1>
                <TextField
                    label="Логин"
                    value={loginValue}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginErrorText}
                />
                <span className="register__warning_caption">
                    Логин может содержать только английские буквы, цифры и знак подчеркивания.
                    Логин не может начинаться с цифры.
                </span>
                <ControlledPasswordField
                    label="Пароль"
                    value={passwordValue}
                    handleChangeValue={handleChangePassword}
                    errorText={passwordErrorText}
                    hasShow={hasShowPassword}
                />
                <span className="register__warning_caption">
                    Пароль должен содержать английские буквы и цифры
                    Длина пароля должна быть не менее {PASSWORD_SIZE} знаков.
                </span>
                <div className="register__password_control_block">
                    <span className="register__create_password" onClick={handleCreatePassword}>
                        Создать пароль
                    </span>
                    {!!passwordValue &&
                    <span className="register__show_password_control" onClick={handleShowPasswordControlClick}>
                        {hasShowPassword ? 'Скрыть' : 'Показать'}
                    </span>
                    }
                </div>
                <div className="register__control_block">
                    <Link to={`/${LOGIN_APP_URL}`}>Выполнить вход</Link>
                    <button type="submit" className="button button_blue" onClick={handleRegisterButtonClick}>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;