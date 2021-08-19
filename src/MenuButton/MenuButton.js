import React from 'react';
import PropTypes from 'prop-types';
import './MenuButton.scss';

function MenuButton({handleClick}) {
    return (
        <div className="menu_button" onClick={handleClick}>
            M
        </div>
    );
}

MenuButton.propTypes = {
    handleClick: PropTypes.func
}

export default MenuButton;