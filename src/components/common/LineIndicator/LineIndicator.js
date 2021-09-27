import React from 'react';
import PropTypes from 'prop-types';
import './LineIndicator.scss';

function LineIndicator({value}) {
    return (
        <div className="line_indicator">
            <div style={{right: `${100 - value}%`}}/>
        </div>
    )
}

LineIndicator.propTypes = {
    value: PropTypes.number
}

export default LineIndicator;