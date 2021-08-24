import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';

function Selector({items, value, handleSelect}) {
    const handleChange = event => handleSelect(event.target.value);

    return (
        <select onChange={handleChange} value={value} className="selector">
            {items.map(
                item =>
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
            )}
        </select>
    );
}

Selector.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    handleSelect: PropTypes.func
}

export default Selector;