import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './MenuItem.scss';

function MenuItem({item, handleClick}) {
    const {title, iconComponent, href} = item;
    return (
        <li className="menu_item">
            <NavLink to={`/admin/${href}`} activeClassName="active_link" onClick={handleClick}>
                {iconComponent}{title}
            </NavLink>
        </li>
    )
}

MenuItem.propTypes = {
    item: PropTypes.object,
    handleClick: PropTypes.func
}

export default MenuItem;