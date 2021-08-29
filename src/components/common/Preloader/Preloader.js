import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ReactComponent as Logo} from '../../../content/images/logo.svg';
import './Preloader.scss';

const DOTS_COUNT = 12;

function Preloader({fullscreen}) {
    const dots = [];
    for (let index = 0; index < DOTS_COUNT; index++) {
        dots.push(<div key={index} className={`preloader__dot-${index + 1}`}/>);
    }

    const preloaderClasses = classNames('preloader', {'fullscreen': fullscreen});

    return (
        <div className={preloaderClasses}>
            <Logo/>
            <div className="preloader__dots_block">
                {dots}
            </div>
        </div>
    )
}

Preloader.defaultProps = {
    fullscreen: false
}

Preloader.propTypes = {
    fullscreen: PropTypes.bool
}

export default Preloader;