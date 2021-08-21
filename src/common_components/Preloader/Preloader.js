import React from 'react';
import {ReactComponent as Logo} from '../../content/images/logo.svg';
import './Preloader.scss';

const DOTS_COUNT = 12;

function Preloader() {
    const dots = [];
    for (let index = 0; index < DOTS_COUNT; index++) {
        dots.push(<div key={index} className={`preloader__dot-${index + 1}`}/>);
    }
    return (
        <div className="preloader">
            <Logo/>
            <div className="preloader__dots_block">
                {dots}
            </div>
        </div>
    )
}

export default Preloader;