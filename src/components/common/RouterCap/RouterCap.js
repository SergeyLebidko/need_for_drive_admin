import React from 'react';
import PropTypes from 'prop-types';
import './RouterCap.scss';

function RouterCap({mainCaption, buttonCaption, handleButtonClick}) {
    return (
        <div className="router_cap">
            <div className="router_cap__content">
                <h1 className="router_cap__main_caption">{mainCaption}</h1>
                <button className="button button_green" onClick={handleButtonClick}>
                    {buttonCaption}
                </button>
            </div>
        </div>
    );
}

RouterCap.propTypes = {
    mainCaption: PropTypes.string,
    buttonCaption: PropTypes.string,
    handleButtonClick: PropTypes.func
}

export default RouterCap;