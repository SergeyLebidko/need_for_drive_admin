import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import './ErrorPane.scss';

function ErrorPane({error, handleBackButtonClick}) {
    const history = useHistory();

    const handleClick = () => {
        if (!handleBackButtonClick) {
            history.goBack();
            return;
        }
        handleBackButtonClick();
    };

    return (
        <div className="error_pane">
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
    handleBackButtonClick: null
}

ErrorPane.propTypes = {
    error: PropTypes.shape({
        httpStatus: PropTypes.number,
        httpText: PropTypes.string
    }),
    handleBackButtonClick: PropTypes.func
}

export default ErrorPane;