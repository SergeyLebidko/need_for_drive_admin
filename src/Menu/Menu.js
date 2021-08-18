import React from 'react';
import BrandStamp, {SMALL_STAMP} from '../common_components/BrandStamp/BrandStamp';
import './Menu.scss';

function Menu(){
    return (
        <nav className="menu">
            <BrandStamp size={SMALL_STAMP}/>
        </nav>
    )
}

export default Menu;