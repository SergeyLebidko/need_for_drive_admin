import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {ReactComponent as Logo} from '../../content/images/logo.svg';
import './BrandStamp.scss';

export const LARGE_STAMP = 'ls';
export const SMALL_STAMP = 'ss';

function BrandStamp({size}) {
    const containerClasses = classNames(
        'brand_stamp',
        {
            'large_stamp': size === LARGE_STAMP,
            'small_stamp': size === SMALL_STAMP
        }
    );
    return (
        <div className={containerClasses}>
            <Logo/>
            <h1>Need for drive</h1>
        </div>
    )
}

BrandStamp.propTypes = {
    size: PropTypes.string
}

export default BrandStamp;