import React from 'react';
import PropTypes from 'prop-types';
import {getRandomString} from '../../../utils/common_utils';
import 'ControlledPassowrdField.scss';

function ControlledPasswordField({label, value, handleChangeValue, errorText, hasShow}){
    const inputId = getRandomString();

    return (
        <div className="controlled_password_field">
            <label htmlFor={inputId}>{label}</label>
            <input
                type={hasShow ? 'text' : 'password'}
                className="text_input"
                value={value}
                onChange={handleChangeValue}
                id={inputId}
            />
            {errorText && <span className="password_field__error_text">{errorText}</span>}
        </div>
    );
}

ControlledPasswordField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleChangeValue: PropTypes.func,
    errorText: PropTypes.string,
    hasShow: PropTypes.bool
}

export default ControlledPasswordField;