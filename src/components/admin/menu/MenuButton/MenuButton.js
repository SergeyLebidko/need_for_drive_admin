import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import oneLine from '../../../../content/images/one_line.svg';
import twoLines from '../../../../content/images/two_lines.svg';
import './MenuButton.scss';

function MenuButton({hasOpened, handleClick}) {
    const menuButtonClasses = classNames(
        'menu_button',
        {
            'button_opened_menu': hasOpened,
            'button_closed_menu': !hasOpened
        }
    );

    return (
        <div className={menuButtonClasses} onClick={handleClick}>
            <img src={oneLine}/>
            <img src={oneLine}/>
            <img src={twoLines}/>
        </div>
    );
}

MenuButton.propTypes = {
    hasOpened: PropTypes.bool,
    handleClick: PropTypes.func
}

export default MenuButton;