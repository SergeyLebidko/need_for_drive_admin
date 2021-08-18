import React from 'react';
import BrandStamp, {SMALL_STAMP} from '../common_components/BrandStamp/BrandStamp';
import './Menu.scss';

function Menu(){
    return (
        <section className="menu">
            <BrandStamp size={SMALL_STAMP}/>
        </section>
    )
}

export default Menu;