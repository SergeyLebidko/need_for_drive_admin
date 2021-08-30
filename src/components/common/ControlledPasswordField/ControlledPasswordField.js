import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {getRandomString} from '../../../utils/common_utils';
import './ControlledPasswordField.scss';

function ControlledPasswordField({label, value, handleChangeValue, errorText, hasShow}) {
    const inputClasses = classNames('text_input', {'text_input_error': !!errorText});

    const inputId = getRandomString();

    return (
        <div className="controlled_password_field">
            <label htmlFor={inputId}>{label}</label>
            <input
                type={hasShow ? 'text' : 'password'}
                className={inputClasses}
                value={value}
                onChange={handleChangeValue}
                id={inputId}
            />
            {errorText && <span className="controlled_password_field__error_text">{errorText}</span>}
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