import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useHistory} from 'react-router-dom';
import './ErrorPane.scss';

function ErrorPane({error, handleBackButtonClick, hasFullscreen}) {
    const history = useHistory();

    const handleClick = () => {
        if (!handleBackButtonClick) {
            history.goBack();
            return;
        }
        handleBackButtonClick();
    };

    const paneClasses = classNames('error_pane', {'error_pane_fullscreen': hasFullscreen});

    return (
        <div className={paneClasses}>
            {!!error.httpStatus && <h1 className="error_pane__error_code">{error.httpStatus}</h1>}
            <h2 className="error_pane__big_caption">Что-то пошло не так</h2>
            <h3 className="error_pane__small_caption">Попробуйте перезагрузить страницу</h3>
            <button className="error_pane__back_button button button_blue" onClick={handleClick}>
                Назад
            </button>
        </div>
    );
}

ErrorPane.defaultProps = {
    handleBackButtonClick: null,
    hasFullscreen: false
}

ErrorPane.propTypes = {
    error: PropTypes.shape({
        httpStatus: PropTypes.number,
        httpText: PropTypes.string
    }),
    handleBackButtonClick: PropTypes.func,
    hasFullscreen: PropTypes.bool
}

export default ErrorPane;