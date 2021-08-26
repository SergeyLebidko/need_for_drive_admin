import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import './ErrorPane.scss';

function ErrorPane({error}) {
    const history = useHistory();

    const handleClick = () => history.goBack();

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

ErrorPane.propTypes = {
    error: PropTypes.shape({
        httpStatus: PropTypes.number,
        httpText: PropTypes.string
    })
}

export default ErrorPane;