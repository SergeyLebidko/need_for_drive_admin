import React from 'react';
import PropTypes from 'prop-types';
import './ListElementControl.scss';

function ListElementControl({handleButtonClick}){
    return (
        <div className="list_element_control">
            <button className="thin_button thin_button_edit" onClick={handleButtonClick}>
                Изменить
            </button>
        </div>
    )
}

ListElementControl.propTypes = {
    handleButtonClick: PropTypes.func
}

export default ListElementControl;