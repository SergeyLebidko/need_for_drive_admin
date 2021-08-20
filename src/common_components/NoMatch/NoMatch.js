import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import './NoMatch.scss';

function NoMatch() {
    const location = useLocation();
    const history = useHistory();

    return (
        <div className="no_match">
            <div className="no_match__content">
                <h1 className="no_match__caption">Страница {location.pathname} не найдена...</h1>
                <button className="button button_green" onClick={() => history.goBack()}>Назад</button>
            </div>
        </div>
    )
}

export default NoMatch;