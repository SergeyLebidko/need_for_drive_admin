import React, {useRef, useState} from 'react';
import {ReactComponent as FindIcon} from '../../../../content/images/find.svg';
import {ReactComponent as RemoveIcon} from '../../../../content/images/remove.svg';
import './SearchField.scss'

function SearchField() {
    const [inputValue, setInputValue] = useState('');
    const [hasRemoveIcon, setHasRemoveIcon] = useState(false);
    const inputField = useRef(null);

    const handleIconClick = () => inputField.current.focus();

    const handleChangeInput = event => {
        const nextValue = event.target.value;
        if (nextValue.length > 0) {
            setHasRemoveIcon(true);
        } else {
            setHasRemoveIcon(false);
        }
        setInputValue(nextValue);
    }

    const handleRemoveClick = () => {
        setInputValue('');
        setHasRemoveIcon(false);
    }

    return (
        <div className="search_field">
            <FindIcon onClick={handleIconClick}/>
            <input
                className="search_field__search_value"
                placeholder="Поиск..."
                ref={inputField}
                value={inputValue}
                onChange={handleChangeInput}
            />
            {hasRemoveIcon && <RemoveIcon onClick={handleRemoveClick}/>}
        </div>
    );
}

export default SearchField;