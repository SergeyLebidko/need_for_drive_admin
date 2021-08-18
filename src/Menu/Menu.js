import React from 'react';
import BrandStamp, {SMALL_STAMP} from '../common_components/BrandStamp/BrandStamp';
import './Menu.scss';

function Menu(){
    return (
        <div className="menu">
            <BrandStamp size={SMALL_STAMP}/>
        </div>
    )
}

export default Menu;