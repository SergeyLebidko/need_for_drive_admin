import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {getRandomString} from '../../../utils/common_utils';
import './TextField.scss';

function TextField({label, value, handleChangeValue, errorText, placeholder}) {
    const inputClasses = classNames('text_input', {'text_input_error': !!errorText});

    const inputId = getRandomString();

    return (
        <div className="text_field">
            {label && <label htmlFor={inputId}>{label}</label>}
            <input
                type="text"
                className={inputClasses}
                value={value}
                onChange={handleChangeValue}
                id={inputId}
                placeholder={placeholder ? placeholder : ''}
            />
            {errorText && <span className="text_input_error_text">{errorText}</span>}
        </div>
    )
}

TextField.defaultProps = {
    label: null,
    placeholder: null
}

TextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleChangeValue: PropTypes.func,
    errorText: PropTypes.string,
    placeholder: PropTypes.string
}

export default TextField;