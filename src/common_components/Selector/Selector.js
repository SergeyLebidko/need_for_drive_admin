import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';

function Selector({items, handleSelect}) {
    const handleChange = event => handleSelect(event.target.value);

    return (
        <select onChange={handleChange} className="selector">
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
    handleSelect: PropTypes.func
}

export default Selector;