import React from 'react';
import PropTypes from 'prop-types';
import './Selector.scss';

function Selector({items, defaultItem, handleSelect}) {
    return (
        <select onChange={e => handleSelect(e)} defaultValue={defaultItem.value} className="selector">
            {items.map(
                item =>
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
            )
            }
        </select>
    );
}

Selector.propTypes = {
    items: PropTypes.array,
    defaultItem: PropTypes.object,
    handleSelect: PropTypes.func
}

export default Selector;