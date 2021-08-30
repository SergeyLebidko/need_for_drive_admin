import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import BrandStamp, {LARGE_STAMP} from '../../common/BrandStamp/BrandStamp';
import TextField from '../../common/TextField/TextField';
import ControlledPasswordField from '../../common/ControlledPasswordField/ControlledPasswordField';
import {Link} from 'react-router-dom';
import {getRandomString} from '../../../utils/common_utils';
import {register} from '../../../utils/fetch_utils';
import {LOGIN_APP_URL} from '../../../constants/urls';
import {ALL_CHARS, LETTER_CHARS, DIGIT_CHARS, PASSWORD_SIZE} from '../../../constants/settings';
import './Register.scss';

function Register() {
    const [loginValue, setLoginValue] = useState('');
    const [loginErrorText, setLoginErrorText] = useState(null);

    const [passwordValue, setPasswordValue] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState(null);
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState(null);

    const [hasShowPassword, setHasShowPassword] = useState(false);

    const [registerProcess, setRegisterProcess] = useState(false);
    const [registerError, setRegisterError] = useState(null);

    const history = useHistory();

    const getLoginError = value => {
        const errors = [];

        if (value.length > 0) {
            if (DIGIT_CHARS.includes(value[0])) errors.push('Логин не может начинаться с цифры.');
            for (const char of value) {
                if (!ALL_CHARS.includes(char)) {
                    errors.push('Логин может содержать только английские буквы, цифры и знак подчеркивания');
                    break;
                }
            }
        }

        return errors.join(' ');
    }

    const getPasswordError = value => {
        const errors = [];

        if (value.length > 0) {
            if (value.length < PASSWORD_SIZE) errors.push(`Длина пароля менее ${PASSWORD_SIZE} символов.`);
            let findDigit = false;
            let findLetter = false;
            for (const char of value) {
                if (LETTER_CHARS.includes(char)) findLetter = true;
                if (DIGIT_CHARS.includes(char)) findDigit = true;
                if (findLetter && findDigit) break;
            }
            if (!findLetter) errors.push('Пароль не содержит английские буквы.');
            if (!findDigit) errors.push('Пароль не содержит цифры.');
        }

        return errors.join(' ');
    }

    const getConfirmPasswordError = (valuePass, valueConfirm) => {
        if (valueConfirm !== valuePass) return 'Пароль и подтверждение не совпадают';
        return null;
    }

    const handleChangeLogin = event => {
        const nextValue = event.target.value;
        setLoginErrorText(getLoginError(nextValue));
        setLoginValue(nextValue);
    }

    const handleChangePassword = event => {
        const nextValue = event.target.value;
        setPasswordErrorText(getPasswordError(nextValue));
        setPasswordValue(nextValue);
        setConfirmPasswordErrorText(getConfirmPasswordError(nextValue, confirmPasswordValue));
    }

    const handleChangeConfirmPassword = event => {
        const nextValue = event.target.value;
        setConfirmPasswordErrorText(getConfirmPasswordError(passwordValue, nextValue));
        setConfirmPasswordValue(nextValue);
    }

    const handleCreatePassword = () => {
        const createdPassword = getRandomString(PASSWORD_SIZE, true);
        setPasswordValue(createdPassword);
        setPasswordErrorText(null);
        setConfirmPasswordValue(createdPassword);
        setConfirmPasswordErrorText(null);
        setHasShowPassword(true);
    };

    const handleShowPasswordControlClick = () => setHasShowPassword(!hasShowPassword);

    const handleRegisterButtonClick = event => {
        event.preventDefault();

        const emptyError = loginValue.length === 0 || passwordValue.length === 0 || confirmPasswordValue.length === 0;
        if (loginValue.length === 0) setLoginErrorText('Обязательное поле');
        if (passwordValue.length === 0) setPasswordErrorText('Обязательное поле');
        if (confirmPasswordValue.length === 0) setConfirmPasswordErrorText('Обязательное поле');
        if (emptyError) return;

        if (loginErrorText || passwordErrorText || confirmPasswordErrorText) return;

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
                <ControlledPasswordField
                    label="Пароль"
                    value={passwordValue}
                    handleChangeValue={handleChangePassword}
                    errorText={passwordErrorText}
                    hasShow={hasShowPassword}
                />
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
                <ControlledPasswordField
                    label="Подтверждение пароля"
                    value={confirmPasswordValue}
                    handleChangeValue={handleChangeConfirmPassword}
                    errorText={confirmPasswordErrorText}
                    hasShow={hasShowPassword}
                />
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