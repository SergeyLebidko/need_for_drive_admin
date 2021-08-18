import React from 'react';
import MenuItems from '../MenuItems/MenuItems';
import BrandStamp, {SMALL_STAMP} from '../common_components/BrandStamp/BrandStamp';
import './Menu.scss';

function Menu() {
    return (
        <nav className="menu">
            <header className="menu__header">
                <BrandStamp size={SMALL_STAMP}/>
            </header>
            <MenuItems/>
        </nav>
    )
}

export default Menu;