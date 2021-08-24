import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';

function Selector({items, defaultItem, handleSelect}) {
    const handleChange = event => handleSelect(event.target.value);

    // TODO Удалить тернарный оператор из defaultValue
    return (
        <select onChange={handleChange} defaultValue={defaultItem ? defaultItem.value : null} className="selector">
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
    defaultItem: PropTypes.object,
    handleSelect: PropTypes.func
}

export default Selector;