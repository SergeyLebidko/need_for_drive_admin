import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';

function Selector({items, value, handleSelect, label, errorText}) {
    const handleChange = event => handleSelect(event.target.value);

    return (
        <div className="selector">
            {label && <label>{label}</label>}
            <select onChange={handleChange} value={value} className="select_input">
                {items.map(
                    item =>
                        <option key={item.value} value={item.value} className="select_option">
                            {item.name}
                        </option>
                )}
            </select>
            {errorText && <span>{errorText}</span>}
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