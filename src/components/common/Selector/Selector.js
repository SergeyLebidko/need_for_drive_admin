import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Selector.scss';

function Selector({items, value, handleSelect, label, errorText}) {
    const handleChange = event => handleSelect(event.target.value);
    const selectClasses = classNames('select_input', {'select_input_error': !!errorText});

    return (
        <div className="selector">
            {label && <label>{label}</label>}
            <select onChange={handleChange} value={value} className={selectClasses} disabled={!items || !items.length}>
                {items && items.map(
                    item =>
                        <option key={item.value} value={item.value} className="select_option">
                            {item.name}
                        </option>
                )}
            </select>
            {errorText && <span className="select_input_error_text">{errorText}</span>}
        </div>
    );
}

Selector.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    handleSelect: PropTypes.func,
    label: PropTypes.string,
    errorText: PropTypes.string
}

export default Selector;