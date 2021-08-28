import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {getRandomString} from '../../../utils/common_utils';
import './TextField.scss';

function TextField({label, value, handleChangeValue, errorText}) {
    const inputClasses = classNames('text_input', {'text_input_error': !!errorText});

    const inputId = getRandomString();

    return (
        <div className="text_field">
            <label htmlFor={inputId} className="text_field__label">{label}</label>
            <input
                type="text"
                className={inputClasses}
                value={value}
                onChange={handleChangeValue}
                id={inputId}
            />
            {errorText && <span className="text_field__error_text">{errorText}</span>}
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleChangeValue: PropTypes.func,
    errorText: PropTypes.string
}

export default TextField;