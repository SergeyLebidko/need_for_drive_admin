import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '../TextField/TextField';
import {setEntityField} from '../../../store/actionCreators';
import './TextValueEditor.scss';

function TextValueEditor(props) {
    const {
        label,
        getValue,
        entityField,
        errorText,
        resetErrorText,
        placeholder,
        enabledSpaceOnly,
        setNullIfEmpty
    } = props;

    const dispatch = useDispatch();
    const value = useSelector(getValue);

    const handleChangeValue = event => {
        let nextValue = event.target.value;

        // Если указан соответствующий флаг - отсекаем попытки ввести строку только из одних пробелов
        if (!enabledSpaceOnly) {
            if (!nextValue.trim() && nextValue.length > 0) return
        }

        // Если указан соответствующий флаг, то пустую строку сохраняем в объекте как null
        if (nextValue === '' && setNullIfEmpty) nextValue = null;

        dispatch(setEntityField(entityField, nextValue));
        if (resetErrorText) resetErrorText();
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
    errorText: null,
    resetErrorText: null,
    placeholder: '',
    enabledSpaceOnly: false,
    setNullIfEmpty: false
}

TextValueEditor.propTypes = {
    label: PropTypes.string,
    getValue: PropTypes.func,
    entityField: PropTypes.string,
    errorText: PropTypes.string,
    resetErrorText: PropTypes.func,
    placeholder: PropTypes.string,
    enabledSpaceOnly: PropTypes.bool,
    setNullIfEmpty: PropTypes.bool
}

export default TextValueEditor;