import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../TextField/TextField';
import {setEntityField} from '../../../store/actionCreators';
import './TextValueEditor.scss';

function TextValueEditor({label, getValue, entityField, errorText, resetErrorText, placeholder}) {
    const dispatch = useDispatch();
    const value = useSelector(getValue);

    const handleChangeValue = event => {
        const nextValue = event.target.value;

        // Сразу же отсекаем попытки ввести значение, состоящее только из пробелов
        if (!nextValue.trim() && nextValue.length > 0) return;

        dispatch(setEntityField(entityField, nextValue));
        resetErrorText();
    };

    return (
        <div className="text_value_editor">
            <TextField
                label={label}
                value={value}
                handleChangeValue={handleChangeValue}
                errorText={errorText}
                placeholder={placeholder}
            />
        </div>
    );
}

TextValueEditor.defaultProps = {
    placeholder: ''
}

TextValueEditor.propTypes = {
    label: PropTypes.string,
    getValue: PropTypes.func,
    entityField: PropTypes.string,
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func,
    placeholder: PropTypes.string
}

export default TextValueEditor;