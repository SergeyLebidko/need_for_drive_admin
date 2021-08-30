import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../MenuItem/MenuItem';
import {useSelector} from 'react-redux';
import {getMenuItems} from '../../../../store/selectors';
import './MenuItems.scss';

function MenuItems({handleMenuItemClick}) {
    const items = useSelector(getMenuItems);
    return (
        <ul className="menu_items">
            {items.map(item => <MenuItem key={item.href} item={item} handleClick={handleMenuItemClick}/>)}
        </ul>
    )
}

MenuItems.propTypes = {
    handleMenuItemClick: PropTypes.func
}

export default MenuItems;