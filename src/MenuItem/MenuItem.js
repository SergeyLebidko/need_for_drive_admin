import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './MenuItem.scss';

function MenuItem({item}) {
    const {title, iconComponent, href} = item;
    return (
        <li>
            {iconComponent}
            <NavLink to={`/admin/${href}`}>{title}</NavLink>
        </li>
    )
}

MenuItem.propTypes = {
    item: PropTypes.object
}

export default MenuItem;