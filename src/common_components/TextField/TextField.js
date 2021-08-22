import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ReactComponent as Show} from '../../content/images/show.svg';
import {ReactComponent as Hide} from '../../content/images/hide.svg';
import {getRandomString} from '../../utils/common_utils';
import './TextField.scss';

export const TEXT = 'text';
export const PASSWORD = 'password';

function TextField({label, fieldType, value, handleChangeValue, errorText}) {
    let [inputType, setInputType] = useState(fieldType);

    const ICON_SELECTOR = {
        [TEXT]: <Hide onClick={() => setInputType(PASSWORD)}/>,
        [PASSWORD]: <Show onClick={() => setInputType(TEXT)}/>
    }

    const inputClasses = classNames(
        'text_input',
        {
            'shifted_text_input': fieldType === PASSWORD,
            'error_text_input': !!errorText
        }
    );

    const inputId = getRandomString();

    return (
        <div className="text_field">
            <label htmlFor={inputId} className="text_field__label">{label}</label>
            <div className="text_field__input_block">
                <input
                    type={inputType}
                    className={inputClasses}
                    value={value}
                    onChange={handleChangeValue}
                    id={inputId}
                />
                {fieldType === PASSWORD && ICON_SELECTOR[inputType]}
                {errorText && <span className="text_field__error_text">{errorText}</span>}
            </div>
        </div>
    )
}

TextField.propTypes = {
    label: PropTypes.string,
    fieldType: PropTypes.string,
    value: PropTypes.string,
    handleChangeValue: PropTypes.func,
    errorText: PropTypes.string
}

export default TextField;