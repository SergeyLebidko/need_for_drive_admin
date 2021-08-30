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
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState(null);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [confirm, setConfirm] = useState('');
    const [confirmError, setConfirmError] = useState(null);

    const [hasShowPassword, setHasShowPassword] = useState(false);

    const [registerProcess, setRegisterProcess] = useState(false);
    const [registerProcessError, setRegisterProcessError] = useState(null);

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

    const getConfirmError = (valuePass, valueConfirm) => {
        if (valueConfirm !== valuePass) return 'Пароль и подтверждение не совпадают';
        return null;
    }

    const handleChangeLogin = event => {
        const nextValue = event.target.value;
        setLoginError(getLoginError(nextValue));
        setLogin(nextValue);
    }

    const handleChangePassword = event => {
        const nextValue = event.target.value;
        setPasswordError(getPasswordError(nextValue));
        setPassword(nextValue);
        setConfirmError(getConfirmError(nextValue, confirm));
    }

    const handleChangeConfirm = event => {
        const nextValue = event.target.value;
        setConfirmError(getConfirmError(password, nextValue));
        setConfirm(nextValue);
    }

    const handleCreatePassword = () => {
        const createdPassword = getRandomString(PASSWORD_SIZE, true);
        setPassword(createdPassword);
        setPasswordError(null);
        setConfirm(createdPassword);
        setConfirmError(null);
        setHasShowPassword(true);
    };

    const handleShowPasswordClick = () => setHasShowPassword(!hasShowPassword);

    const handleRegisterButtonClick = event => {
        event.preventDefault();

        const emptyError = login.length === 0 || password.length === 0 || confirm.length === 0;
        if (login.length === 0) setLoginError('Обязательное поле');
        if (password.length === 0) setPasswordError('Обязательное поле');
        if (confirm.length === 0) setConfirmError('Обязательное поле');
        if (emptyError) return;

        if (loginError || passwordError || confirmError) return;

        // Отправляем данные для регистрации
        setRegisterProcess(true);
        register(login, password)
            .then(() => {
                history.push(`/${LOGIN_APP_URL}`);
            })
            .catch(err => {
                setRegisterProcessError(err);
                setRegisterProcess(false);
            });
    };

    const clearFormData = () => {
        setLogin('');
        setLoginError(null);
        setPassword('');
        setPasswordError(null);
        setHasShowPassword(false);
        setRegisterProcess(false);
        setRegisterProcessError(null);
    }

    if (registerProcess) return <Preloader/>;

    if (registerProcessError) return <ErrorPane error={registerProcessError} handleBackButtonClick={clearFormData}/>;

    return (
        <div className="register">
            <BrandStamp size={LARGE_STAMP}/>
            <form className="form">
                <h1 className="register__form_caption">Регистрация</h1>
                <TextField
                    label="Логин"
                    value={login}
                    handleChangeValue={handleChangeLogin}
                    errorText={loginError}
                />
                <ControlledPasswordField
                    label="Пароль"
                    value={password}
                    handleChangeValue={handleChangePassword}
                    errorText={passwordError}
                    hasShow={hasShowPassword}
                />
                <div className="register__password_control_block">
                    <span className="register__create_password" onClick={handleCreatePassword}>
                        Создать пароль
                    </span>
                    {!!password &&
                    <span className="register__show_password_control" onClick={handleShowPasswordClick}>
                        {hasShowPassword ? 'Скрыть' : 'Показать'}
                    </span>
                    }
                </div>
                <ControlledPasswordField
                    label="Подтверждение пароля"
                    value={confirm}
                    handleChangeValue={handleChangeConfirm}
                    errorText={confirmError}
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