import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ReactComponent as Show} from '../../content/images/show.svg';
import {ReactComponent as Hide} from '../../content/images/hide.svg';
import './TextField.scss';

export const TEXT = 'text';
export const PASSWORD = 'password';

function TextField({caption, fieldType}) {
    let [inputType, setInputType] = useState(fieldType);

    const ICON_SELECTOR = {
        [TEXT]: <Hide onClick={() => setInputType(PASSWORD)}/>,
        [PASSWORD]: <Show onClick={() => setInputType(TEXT)}/>
    }

    const inputClasses = classNames('text_input', {'shifted_input': fieldType === PASSWORD});

    return (
        <div className="text_field">
            <label className="text_field__caption">{caption}</label>
            <div className="text_field__input_block">
                <input type={inputType} className={inputClasses}/>
                {fieldType === PASSWORD ? ICON_SELECTOR[inputType] : ''}
            </div>
        </div>
    )
}

TextField.propTypes = {
    caption: PropTypes.string,
    fieldType: PropTypes.string
}

export default TextField;