import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ReactComponent as Show} from '../../../content/images/show.svg';
import {ReactComponent as Hide} from '../../../content/images/hide.svg';
import {getRandomString} from '../../../utils/common_utils';
import './PasswordField.scss';

function PasswordField({label, value, handleChangeValue, errorText}) {
    const [hasShow, setHasShow] = useState(false);

    const inputClasses = classNames('text_input', {'text_input_error': !!errorText});

    const handleShowSwitchClick = () => setHasShow(!hasShow);

    const inputId = getRandomString();

    return (
        <div className="password_field">
            <label htmlFor={inputId}>{label}</label>
            <input
                type={hasShow ? 'text' : 'password'}
                className={inputClasses}
                value={value}
                onChange={handleChangeValue}
                id={inputId}
            />
            {hasShow ? <Hide onClick={handleShowSwitchClick}/> : <Show onClick={handleShowSwitchClick}/>}
            {errorText && <span className="password_field__error_text">{errorText}</span>}
        </div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleChangeValue: PropTypes.func,
    errorText: PropTypes.string
}

export default PasswordField;