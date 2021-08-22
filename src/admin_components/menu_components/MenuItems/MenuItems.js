import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import {useSelector} from 'react-redux';
import {getMenuItems} from '../../../store/selectors';
import './MenuItems.scss';

function MenuItems() {
    const items = useSelector(getMenuItems);
    return (
        <ul className="menu_items">
            {items.map(item => <MenuItem key={item.href} item={item}/>)}
        </ul>
    )
}

export default MenuItems;