import React from 'react';
import PropTypes from 'prop-types';
import './FilterControlBlock.scss';

function FilterControlBlock({handleReset, handleApply}) {
    return (
        <div className="filter_control_block">
            <button className="button button_red" onClick={handleReset}>Сбросить</button>
            <button className="button button_blue" onClick={handleApply}>Применить</button>
        </div>
    );
}

FilterControlBlock.propTypes = {
    handleReset: PropTypes.func,
    handleApply: PropTypes.func
}

export default FilterControlBlock;
